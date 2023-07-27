import { Request, Response, NextFunction } from "express";
import { compareSync } from "bcryptjs";
import { verify } from "jsonwebtoken";

import { UsersMiddlewaresRepositories } from "../repositories/middleware/middleware.users.repositories";
import { TLogin } from "../interfaces/users.interfaces";

class UsersMiddlewares {
    constructor(private usersRepositories: UsersMiddlewaresRepositories) {}

    async verifyById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        const userId = Number(req.params.id)
    
        const userFind = await this.usersRepositories.findById(userId)
    
        if (!userFind) return res.status(404).json({message: "User not Found!"})
    
        next();
    }

    async verifyByEmail(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        const { email } = req.body;

        const userFind = await this.usersRepositories.findByEmail(email)
    
        if (userFind) return res.status(409).json({message: "Email already in use"})
    
        next();
    }

    async verifyByCpf(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        const { cpf } = req.body
        const method = req.method

        const userFind = await this.usersRepositories.findByCpf(cpf)
        if (method === "GET") {
            if (!userFind) return res.status(404).json({message: "User not Found!"})
        }

        if (method === "POST") {
            if (userFind) return res.status(409).json({message: "CPF already registered"})
        }

        next();
    }

    async verifyCredentials (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const userData: TLogin = req.body
        
        const userFind = await this.usersRepositories.findByEmail(userData.email)
    
        if (!userFind) return res.status(401).json({message: "Invalid credentials"});
    
        const userInactive = userFind.deleted;
        if (userInactive) return res.status(401).json({message: "Deleted account"});
    
        const userPassword: string = userFind.password;
        const userRequestPassword: string = userData.password;
    
        const validatePassword: boolean = compareSync(userRequestPassword, userPassword);
    
        if (!validatePassword) return res.status(401).json({message: "Invalid credentials"});
    
        res.locals.tokenData = { id: userFind.id, role: userFind.role, cpf: userFind.cpf }
    
        return next();
    };

    verifyToken(req: Request, res: Response, next: NextFunction): Response | void {
        const authorization: string | null | undefined = req.headers.authorization;
    
        if (!authorization) return res.status(401).json({message: "Missing bearer token"})
    
        const [_bearer, token] = authorization.split(" ");
    
        verify(
            token,
            String(process.env.SECRET_KEY),
            (err: any, decode: any) => {
                if (err) return res.status(401).json({message: err.message})
    
                const userId: string = decode.sub;
                const userRole: string = decode.role;
                const userCpf: string = decode.cpf;
                res.locals.tokenData = { id: userId, role: userRole, cpf: userCpf }
            }
        );
    
        return next();
    };

    verifyAdminRole(req: Request, res: Response, next: NextFunction): Response | void {
        const role = res.locals.tokenData.role

        if (role !== "admin") return res.status(403).json({message: "Unauthorized"})

        return next()
    }
}

const usersMiddlewaresRepositories = new UsersMiddlewaresRepositories()
const usersMiddlewares = new UsersMiddlewares(usersMiddlewaresRepositories)

export default usersMiddlewares
