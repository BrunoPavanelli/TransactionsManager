import { Response, Request } from "express";

import schemas from "../schemas/users.schemas";
import { UsersServices, usersService } from "../services/users.service";
import {
	TToken,
	TTokenObject,
	TUserLoggedResponse,
	TUserRequest,
	TUserResponse,
	TUserUpdate,
} from "../interfaces/users.interfaces";

class UsersControllers {
	constructor(private usersServices: UsersServices) {}

	login(req: Request, res: Response): Response {
		const tokenData: TToken = res.locals.tokenData;
		const userToken: TTokenObject = this.usersServices.login(tokenData);

		return res.json(userToken);
	}

	async create(req: Request, res: Response): Promise<Response> {
		const userData: TUserRequest = req.body;
		const newUser: TUserResponse = await this.usersServices.create(
			userData
		);

		return res.status(201).json(newUser);
	}

	async findAll(req: Request, res: Response): Promise<Response> {
		const users: TUserResponse[] = await this.usersServices.findAll();

		return res.json(users);
	}

	async findById(req: Request, res: Response): Promise<Response> {
		const userId: string = req.params.id;
		const userFind: TUserResponse = await this.usersServices.findById(
			userId
		);

		return res.json(userFind);
	}

	async findByToken(req: Request, res: Response): Promise<Response> {
		const userId: string = res.locals.tokenData.id;
		const userFind: TUserLoggedResponse = await this.usersServices.findById(
			userId
		);
		
		const userParsed: TUserLoggedResponse = schemas.responseLoggedUser.parse(userFind);

		return res.json(userParsed);
	}

	async findByCpf(req: Request, res: Response): Promise<Response> {
		const userCpf: string = req.body.cpf;
		const userFind: TUserResponse = await this.usersServices.findByCpf(
			userCpf
		);

		return res.json(userFind);
	}

	async updateById(req: Request, res: Response): Promise<Response> {
		const userId: string = req.params.id;
		const userData: TUserUpdate = req.body;
		const userUpdated: TUserResponse = await this.usersServices.updateById(
			userId,
			userData
		);

		return res.json(userUpdated);
	}

	async deleteById(req: Request, res: Response): Promise<Response> {
		const userId: string = req.params.id;
		await this.usersServices.deleteById(userId);

		return res.sendStatus(204);
	}
}

const usersController = new UsersControllers(usersService);

export default usersController;