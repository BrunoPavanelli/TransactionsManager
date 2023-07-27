import { z } from "zod";

import schemas from "../schemas/transactions.schemas";

type TTransactionResponse = z.infer<typeof schemas.response>;

type TTransactionRequest = z.infer<typeof schemas.request>;

type TTrasactionUpdate = z.infer<typeof schemas.update>;

type TTransactionCreateInDb = z.infer<typeof schemas.toCreateInDb>;

type TSpreadSheetData = {
    description: string;
    date: string;
    points_value: string;
    value: string;
    status: "Approved" | "Reproved" | "In Analysis";
    cpf: string;
};

export {
	TTransactionResponse,
	TTransactionRequest,
	TTrasactionUpdate,
	TTransactionCreateInDb,
	TSpreadSheetData,
};