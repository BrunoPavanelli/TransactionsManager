import { z } from "zod"


const transactions = z.object({
    id: z.number(),
    description: z.string(),
    date: z.string(),
    points_value: z.number(),
    value: z.number(),
    status: z.enum(["Approved", "Reproved", "In Analysis"]),
    user_id: z.number()
})

const transactionsWithOutId = transactions.omit({ id: true })

const request = transactions.omit({ id: true, user_id: true })

const toCreateInDb = transactions.omit({ id: true })

const update = request.omit({
    description: true,
    date: true,
    points_value: true,
    value: true
})

const schemas = { transactions, request, update, toCreateInDb, transactionsWithOutId }

export default schemas