import database from "../../../database/database";
import schemas from "../../schemas/users.schemas";
import { UsersRepositories } from "../users.repositories";
import {
	TUserRequest,
	TUserResponse,
	TUser,
	TUserUpdate,
} from "../../interfaces/users.interfaces";

export class KnexUsersRepositories implements UsersRepositories {
	constructor() {}

	async create(newUserData: TUserRequest): Promise<TUserResponse> {
		const newUser = await database("users").insert({
			...newUserData,
		});

		const userData: TUser = await database("users")
			.where({
				id: newUser[0],
			})
			.select("*")
			.first();

		const userToReturn: TUserResponse = schemas.response.parse(userData);

		return userToReturn;
	}

	async findAll(): Promise<TUserResponse[]> {
		const users: TUser[] = await database.select("*").from("users");

		const usersToReturn: TUserResponse[] = users.map((user) =>
			schemas.response.parse(user)
		);

		return usersToReturn;
	}

	async findById(userId: string): Promise<TUserResponse> {
		const user: TUser = await database
			.select("*")
			.from("users")
			.where({
				id: userId,
			})
			.first();

		const userToReturn: TUserResponse = schemas.response.parse(user);

		return userToReturn;
	}

	async findByCpf(userCpf: string): Promise<TUserResponse> {
		const user: TUser = await database
			.first()
			.select("*")
			.from("users")
			.where({
				cpf: userCpf,
			});

		const userToReturn: TUserResponse = schemas.response.parse(user);

		return userToReturn;
	}

	async updateById(
		userId: string,
		newUserData: TUserUpdate
	): Promise<TUserResponse> {
		await database("users")
			.where({ id: userId })
			.first()
			.update({
				...newUserData,
			});

		const userData: TUser = await database("users")
			.first()
			.where({
				id: userId,
			})
			.select("*");

		const userToReturn: TUserResponse = schemas.response.parse(userData);

		return userToReturn;
	}

	async deleteById(userId: string): Promise<void> {
		await database("users").where({ id: userId }).first().delete();

		return;
	}
}

export const usersRepositories = new KnexUsersRepositories();