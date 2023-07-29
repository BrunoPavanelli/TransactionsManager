import { z } from "zod";

import schemas from "../schemas/transactions.schemas";

type TTransactions = z.infer<typeof schemas.transactions>

type TTransactionResponse = z.infer<typeof schemas.response>;

type TTransactionRequest = z.infer<typeof schemas.request>;

type TTrasactionUpdate = z.infer<typeof schemas.update>;

type TTransactionCreateInDb = z.infer<typeof schemas.toCreateInDb>;

type TSpreadSheetData = {
    description: string;
    date: number;
    points_value: string;
    value: string;
    status: "Approved" | "Reproved" | "In Analysis";
    cpf: string;
};

type TNoProducts = {
    message: string
}

type TDateRange = {
    minDate: number,
    maxDate: number
}

type TSubtotal = {
    subtotal: number
}

type TValueRange = z.infer<typeof schemas.valueRange>

type TFilterTransactions = {
    userCpf: string | null, 
    product: string | null, 
    dateRange: string| null
    valueRange: {
        minValue: number | null;
        maxValue: number | null;
    } 
    status: string | null
}

export {
	TTransactionResponse,
	TTransactionRequest,
	TTrasactionUpdate,
	TTransactionCreateInDb,
	TSpreadSheetData,
	TNoProducts,
	TDateRange,
	TValueRange,
	TSubtotal,
	TTransactions,
	TFilterTransactions
};