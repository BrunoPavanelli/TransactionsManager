import express, { json } from "express";
import "reflect-metadata";
import "express-async-errors";
import cors from "cors";

import routes from "./routes";
import sharedMiddlewares from "./shared";


const app = express();
app.use(json());

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/users", routes.users);
app.use("/transactions", routes.transactions);

app.use(sharedMiddlewares.handleError);

export default app;