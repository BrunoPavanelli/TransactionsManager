import fs from "node:fs"
import { parse as csvParse } from "csv-parse"

import schemas from "../schemas/transactions.schemas";
import { AppError } from "../../shared/handlerErrors.middleware";
import { UsersRepositories } from "../../users/repositories/users.repositories";
import { usersRepositories } from "../../users/repositories/knex/knex.users.repositories";
import { TransactionsRepositories } from "../repositories/transactions.repositories";
import { transactionsRepositories } from "../repositories/knex/knex.transactions.repositories";
import { TSpreadSheetData, TTransactionCreateInDb, TTransactionResponse, TTrasactionUpdate } from "../interfaces/transactions.interfaces";

export class TransactionsServices {
    constructor(
        private transactionsRepositories: TransactionsRepositories,
        private usersRepositories: UsersRepositories
    ) {}

    private loadCsvFile(file: Express.Multer.File) {
        return new Promise<TSpreadSheetData[]>((resolve, reject) => {
            const stream = fs.createReadStream(file.path)
            const datas: TSpreadSheetData[] = []
            const parseFile = csvParse()
        
            stream.pipe(parseFile)
   
            parseFile.
            on("data", async line => {
                let [
                    cpf,
                    description,
                    date,
                    points_value,
                    value,
                    status
                ] = line

                value = value.split(".").join("").split(",").join("")
                points_value = value.split(".").join("").split(",").join("")

                switch (status) {
                    case "Aprovado":
                        status = "Approved"
                        break
                    case "Reprovado":
                        status = "Reproved"
                        break
                    case "Em avaliação":
                        status = "In Analysis" 
                        break
                    default:
                        status = "Invalid data"
                }

                datas.push({
                    cpf,
                    description,
                    date,
                    points_value,
                    value,
                    status
                })
            })
            .on("end", () => {
                fs.promises.unlink(file.path)
                resolve(datas)
            })
            .on("error", error => {
                reject(error)
            })
        })
   } 

   async importFile(file: Express.Multer.File) {
        const datas = await this.loadCsvFile(file)
        const toCheck = {
            cpf: 'CPF',
            description: 'Descrição da transação',
            date: 'Data da transação',
            points_value: 'Valor',
            value: 'Valor',
            status: 'Invalid data'
        }
        if (JSON.stringify(datas[0]) !== JSON.stringify(toCheck)) throw new AppError("Invalid File", 400)
        datas.splice(0,1)

        const unregisteredUsers = []
        const registeredUsers = []
        for (const data of datas) {
            try {
                const userFind = await this.usersRepositories.findByCpf(data.cpf)
                registeredUsers.push(data.cpf)

                const newData: TTransactionCreateInDb = {
                    description: data.description,
                    date: data.date,
                    points_value: parseInt(data.points_value),
                    value: parseInt(data.points_value) * 100,
                    status: data.status,
                    user_id: userFind.id
                }
    
                const newDataParsed = schemas.transactionsWithOutId.safeParse(newData)
                if (!newDataParsed.success) throw new AppError("Invalid File", 400)
    
                await this.transactionsRepositories.create({
                    ...newData,
                })
            } catch {
                unregisteredUsers.push(data.cpf)
            }
        }

        if (registeredUsers.length > 0 && unregisteredUsers.length === 0) {
            return {
                message: "Data inserted in DB with succes!"
            }
        } else if (registeredUsers.length === 0 && unregisteredUsers.length > 0) {
            return {
                error: {
                    message: "Data not inserted in DB for unregistered CPF's"
                }
            }
        } else if (registeredUsers.length > 0 && unregisteredUsers.length > 0) {
            return {
                sucess: {
                    message: "Data inserted in DB with succes for CPF's:",
                    cpfs: registeredUsers
                },
                error: {
                    message: "Data not inserted in DB for unregistered CPF's:",
                    cpfs: unregisteredUsers
                }
            }
        }
    }

    async create(transactionData: TTransactionCreateInDb): Promise<TTransactionResponse> {
        return await this.transactionsRepositories.create(transactionData);
    }

    async findAll(): Promise<TTransactionResponse[]> {
        return await this.transactionsRepositories.findAll();
    }

    async findByCpfUser(userCpf: string): Promise<TTransactionResponse[]> {
        const userFind = await this.usersRepositories.findByCpf(userCpf)

        return await this.transactionsRepositories.findByCpfUser(userFind.id)
    }

    async updateById(transactionId: number, newTransactionData: TTrasactionUpdate): Promise<TTransactionResponse> {
        return await this.transactionsRepositories.updateById(transactionId, newTransactionData)
    }

    async deleteById(transactionId: number): Promise<void> {
        return await this.transactionsRepositories.deleteById(transactionId)
    }  
}

export const transactionsServices = new TransactionsServices(transactionsRepositories, usersRepositories)

