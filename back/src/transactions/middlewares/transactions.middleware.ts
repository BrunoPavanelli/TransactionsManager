import { Request, Response, NextFunction } from "express";

import { TransactionsMiddlewaresRepositories } from "../repositories/middleware/middlewares.transactions.repositorires";

class TransactionsMiddlewares {
    constructor(private transactionsRepositories: TransactionsMiddlewaresRepositories) {}

    async verifyById(req: Request, res: Response, next: NextFunction) {
        const transactionId = Number(req.params.id)

        const transactionFind = await this.transactionsRepositories.findById(transactionId)

        if (!transactionFind) return res.status(404).json({message: "Transaction not Found!"})
    
        next();   
    }
}

const transactionsMiddlewaresRepositories = new TransactionsMiddlewaresRepositories()
const transactionsMiddlewares = new TransactionsMiddlewares(transactionsMiddlewaresRepositories)

export default transactionsMiddlewares