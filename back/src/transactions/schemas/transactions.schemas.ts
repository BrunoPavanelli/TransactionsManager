import { z } from "zod";

const transactions = z.object({
	id: z.string(),
	description: z.string(),
	date: z.number(),
	points_value: z.number(),
	value: z.number(),
	status: z.enum(["Approved", "Reproved", "In Analysis"]),
	user_id: z.string(),
	cpf: z.string()
});

const transactionsWithOutId = transactions.omit({ id: true, cpf: true });

const response = transactions.omit({ cpf: true });

const request = transactions.omit({ id: true, user_id: true });

const status = z.object({
	status: z.enum(["Approved", "Reproved", "In Analysis"]),
});

const product = z.object({
	product: z.string()
});

const toCreateInDb = transactions.omit({ id: true, cpf: true });

const update = request.omit({
	description: true,
	date: true,
	points_value: true,
	value: true,
	cpf: true
});

const dateRange = z.object({
	dateRange: z.enum(["30 days", "90 days", "180 days", "1 year", "2 years", "5 years"])
});

const valueRange = z.object({
	minValue: z.number(),
	maxValue: z.number()
});

const schemas = {
	transactions,
	request,
	response,
	update,
	toCreateInDb,
	transactionsWithOutId,
	status,
	product,
	dateRange,
	valueRange
};

export default schemas;
