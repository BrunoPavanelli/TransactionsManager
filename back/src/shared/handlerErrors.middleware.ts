import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message),
        this.statusCode = statusCode;
    }
}

const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        const errorMessage = {message: err.message};
        return res.status(err.statusCode).json(errorMessage);
    }

    if (err instanceof ZodError) {
        const errorMessage = {message: err.flatten().fieldErrors};
        return res.status(400).json(errorMessage);
    }

    console.log(err);
    const errorMessage = {message: "Internal Server Error"};
    return res.status(500).json(errorMessage);
};

export { AppError, handleError };