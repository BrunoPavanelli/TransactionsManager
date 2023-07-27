import { Router } from "express";

import usersController from "../controllers/users.controller";

import schemas from "../schemas/users.schemas";
import sharedMiddlewares from "../../shared";
import usersMiddlewares from "../middlewares/users.middleware";

export const users = Router();

users.post(
	"/login",
	(req, res, next) => usersMiddlewares.verifyCredentials(req, res, next),
	(req, res) => usersController.login(req, res)
);

users.post(
	"",
	sharedMiddlewares.validateSchema(schemas.request),
	(req, res, next) => usersMiddlewares.verifyByEmail(req, res, next),
	(req, res, next) => usersMiddlewares.verifyByCpf(req, res, next),
	(req, res) => usersController.create(req, res)
);

users.use((req, res, next) => usersMiddlewares.verifyToken(req, res, next));

users.get("/token", (req, res) => usersController.findByToken(req, res));

users.use((req, res, next) => usersMiddlewares.verifyAdminRole(req, res, next));

users.get("", (req, res) => usersController.findAll(req, res));

users.get(
	"/cpf",
	(req, res, next) => usersMiddlewares.verifyByCpf(req, res, next),
	(req, res) => usersController.findByCpf(req, res)
);

users.get(
	"/:id",
	(req, res, next) => usersMiddlewares.verifyById(req, res, next),
	(req, res) => usersController.findById(req, res)
);

users.patch(
	"/:id",
	(req, res, next) => usersMiddlewares.verifyById(req, res, next),
	(req, res) => usersController.updateById(req, res)
);

users.delete(
	"/:id",
	(req, res, next) => usersMiddlewares.verifyById(req, res, next),
	(req, res) => usersController.deleteById(req, res)
);
