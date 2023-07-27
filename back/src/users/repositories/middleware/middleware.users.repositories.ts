import database from "../../../database/database";
import { TUser } from "../../interfaces/users.interfaces";
import { UsersAbstractMiddlewares } from "../users.repositories";

export class UsersMiddlewaresRepositories implements UsersAbstractMiddlewares {
	async findById(userId: number): Promise<TUser> {
		const userFind: TUser = await database
			.select("*")
			.from("users")
			.where({
				id: userId,
			})
			.first();

		return userFind;
	}

	async findByEmail(email: string): Promise<TUser> {
		const userFind: TUser = await database
			.select("*")
			.from("users")
			.where({
				email: email,
			})
			.first();

		return userFind;
	}

	async findByCpf(userCpf: string): Promise<TUser> {
		const userFind: TUser[] = await database
			.select("*")
			.from("users")
			.where({
				cpf: userCpf,
			});

		return userFind[0];
	}
}
