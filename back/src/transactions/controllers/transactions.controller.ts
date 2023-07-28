import { Request, Response } from "express";

import {
	TransactionsServices,
	transactionsServices,
} from "../services/transactions.service";
import {
	TNoProducts,
	TTransactionCreateInDb,
	TTransactionRequest,
	TTransactionResponse,
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
		const transactionData: TTransactionRequest = req.body;

		const newTransaction: TTransactionCreateInDb =
            await this.transactionsServices.create({
            	...transactionData,
            });

		return res.status(201).json(newTransaction);
	}

	async findAll(req: Request, res: Response): Promise<Response> {
		const transactions: TTransactionResponse[] =
            await this.transactionsServices.findAll();

		return res.json(transactions);
	}

	async findByCpfUser(req: Request, res: Response): Promise<Response> {
		const { cpf } = req.body;
		const transactions: TTransactionResponse[] =
            await this.transactionsServices.findByCpfUser(cpf);

		return res.json(transactions);
	}

	async findByStatus(req: Request, res: Response): Promise<Response> {
		const { status } = req.body;
		const transactions: TTransactionResponse[] =
            await this.transactionsServices.findByStatus(status);

		return res.json(transactions);
	}
	
	async findByProduct(req: Request, res: Response): Promise<Response> {
		const { product } = req.body;
		const transactions: TTransactionResponse[] | TNoProducts =
            await this.transactionsServices.findByProduct(product);

		return res.json(transactions);
	}

	async findByDateRange(req: Request, res: Response): Promise<Response> {
		const { dateRange } = req.body;
		const transactions: TTransactionResponse[] =
            await this.transactionsServices.findByDateRange(dateRange);

		return res.json(transactions);
	}

	async findByToken(req: Request, res: Response): Promise<Response> {
		const { cpf } = res.locals.tokenData;
		const transactions: TTransactionResponse[] =
            await this.transactionsServices.findByCpfUser(cpf);

		return res.json(transactions);
	}

	async updateById(req: Request, res: Response): Promise<Response> {
		const transactionId: number = parseInt(req.params.id);
		const transactionData: TTrasactionUpdate = req.body;
		const transactionUpdated: TTransactionResponse =
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
