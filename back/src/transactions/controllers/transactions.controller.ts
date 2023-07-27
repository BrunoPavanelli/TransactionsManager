import { Request, Response } from "express";

import {
	TransactionsServices,
	transactionsServices,
} from "../services/transactions.service";
import {
	TTransactionCreateInDb,
	TTransactionRequest,
	TTrasactionUpdate,
} from "../interfaces/transactions.interfaces";

class TransactionsController {
	constructor(private transactionsServices: TransactionsServices) {}

	async importFile(req: Request, res: Response) {
		const { file } = req;
		const datas = await this.transactionsServices.importFile(file!);

		return res.json(datas);
	}

	async create(req: Request, res: Response): Promise<Response> {
		const userId = parseInt(res.locals.userId);
		const transactionData: TTransactionRequest = req.body;

		const newTransaction: TTransactionCreateInDb =
            await this.transactionsServices.create({
            	...transactionData,
            	user_id: userId,
            });

		return res.status(201).json(newTransaction);
	}

	async findAll(req: Request, res: Response): Promise<Response> {
		const transactions: TTransactionRequest[] =
            await this.transactionsServices.findAll();

		return res.json(transactions);
	}

	async findByCpfUser(req: Request, res: Response): Promise<Response> {
		const { cpf } = req.body;
		const transactions: TTransactionRequest[] =
            await this.transactionsServices.findByCpfUser(cpf);

		return res.json(transactions);
	}

	async findByToken(req: Request, res: Response): Promise<Response> {
		const { cpf } = res.locals.tokenData;
		const transactions: TTransactionRequest[] =
            await this.transactionsServices.findByCpfUser(cpf);

		return res.json(transactions);
	}

	async updateById(req: Request, res: Response): Promise<Response> {
		const transactionId: number = parseInt(req.params.id);
		const transactionData: TTrasactionUpdate = req.body;
		const transactionUpdated: TTransactionRequest =
            await this.transactionsServices.updateById(
            	transactionId,
            	transactionData
            );

		return res.json(transactionUpdated);
	}

	async deleteById(req: Request, res: Response): Promise<Response> {
		const transactionId: number = parseInt(req.params.id);
		await this.transactionsServices.deleteById(transactionId);

		return res.sendStatus(204);
	}
}

const transactionsController = new TransactionsController(transactionsServices);

export default transactionsController;
