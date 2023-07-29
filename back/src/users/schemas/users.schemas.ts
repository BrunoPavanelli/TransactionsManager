import { z } from "zod";

const user = z.object({
	id: z.string(),
	username: z.string(),
	email: z.string().email(),
	password: z.string(),
	role: z.enum(["admin", "common"]).default("common"),
	cpf: z.string(),
	created_at: z.date(),
	deleted: z.boolean().default(false),
});

const request = user.omit({ id: true, created_at: true, deleted: true });

const response = user.omit({ password: true, deleted: true });

const responseLoggedUser = user.omit({ password: true, deleted: true, created_at: true, cpf: true });

const update = user.partial();

const login = z.object({
	email: z.string().email(),
	password: z.string(),
});

const token = z.object({
	id: z.string(),
	role: z.string(),
	cpf: z.string(),
});

const schemas = { user, request, response, responseLoggedUser, update, login, token };

export default schemas;
