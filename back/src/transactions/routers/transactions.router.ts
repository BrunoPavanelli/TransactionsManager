import { Router } from "express";
import multer from "multer";

import multerConfig from "../../config/multer.config";
import schemas from "../schemas/transactions.schemas";
import sharedMiddlewares from "../../shared";
import usersMiddlewares from "../../users/middlewares/users.middleware";
import transactionsMiddlewares from "../middlewares/transactions.middleware";
import transactionsController from "../controllers/transactions.controller";

const upload = multer(multerConfig);
export const transactions = Router();

transactions.use((req, res, next) =>
	usersMiddlewares.verifyToken(req, res, next)
);

transactions.get("/token", (req, res) =>
	transactionsController.findByToken(req, res)
);

transactions.use((req, res, next) =>
	usersMiddlewares.verifyAdminRole(req, res, next)
);

transactions.post("/upload", upload.single("file"), (req, res) =>
	transactionsController.importFile(req, res)
);

transactions.post(
	"",
	sharedMiddlewares.validateSchema(schemas.request),
	(req, res, next) => usersMiddlewares.verifyByCpf(req, res, next),
	(req, res) => transactionsController.create(req, res)
);

transactions.get("", (req, res) => transactionsController.findAll(req, res));

transactions.get(
	"/cpf",
	(req, res, next) => usersMiddlewares.verifyByCpf(req, res, next),
	(req, res) => transactionsController.findByCpfUser(req, res)
);

transactions.patch(
	"/:id",
	sharedMiddlewares.validateSchema(schemas.update),
	(req, res, next) => transactionsMiddlewares.verifyById(req, res, next),
	(req, res) => transactionsController.updateById(req, res)
);

transactions.delete(
	"/:id",
	(req, res, next) => transactionsMiddlewares.verifyById(req, res, next),
	(req, res) => transactionsController.deleteById(req, res)
);
