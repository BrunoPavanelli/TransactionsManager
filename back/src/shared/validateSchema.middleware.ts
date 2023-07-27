import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const validateSchema = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction): void => {
    const toValidate = req.body;
    const validated = schema.parse(toValidate);

    req.body = validated;
    next();
};

export default validateSchema;