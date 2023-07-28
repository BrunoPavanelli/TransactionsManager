import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({ required_error: "Please, fill with your email" }).email({ message: "Must be a valid email" }),
    password: z.string({ required_error: "Please, fill with your password" })
});