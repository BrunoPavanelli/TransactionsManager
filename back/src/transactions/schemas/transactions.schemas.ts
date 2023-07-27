import { z } from "zod";

const transactions = z.object({
	id: z.number(),
	description: z.string(),
	date: z.string(),
	points_value: z.number(),
	value: z.number(),
	status: z.enum(["Approved", "Reproved", "In Analysis"]),
	user_id: z.number(),
	cpf: z.string()
});

const transactionsWithOutId = transactions.omit({ id: true, cpf: true });

const response = transactions.omit({ cpf: true });

const request = transactions.omit({ id: true, user_id: true });

const toCreateInDb = transactions.omit({ id: true, cpf: true });

const update = request.omit({
	description: true,
	date: true,
	points_value: true,
	value: true,
	cpf: true
});

const schemas = {
	transactions,
	request,
	response,
	update,
	toCreateInDb,
	transactionsWithOutId,
};

export default schemas;
