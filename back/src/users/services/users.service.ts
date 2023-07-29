import { sign } from "jsonwebtoken";
import { getRounds, hashSync } from "bcryptjs";

import { UsersRepositories } from "../repositories/users.repositories";
import { usersRepositories } from "../repositories/knex/knex.users.repositories";
import {
	TToken,
	TTokenObject,
	TUserRequest,
	TUserResponse,
	TUserUpdate,
} from "../interfaces/users.interfaces";
import schemas from "../schemas/users.schemas";

export class UsersServices {
	constructor(private usersRepository: UsersRepositories) {}

	login(tokenData: TToken): TTokenObject {
		const token = sign(
			{ role: tokenData.role, cpf: tokenData.cpf },
			String(process.env.SECRET_KEY),
			{ expiresIn: "24h", subject: String(tokenData.id) }
		);
		const tokenObject: TTokenObject = {
			token: token,
		};

		return tokenObject;
	}

	async create(userData: TUserRequest): Promise<TUserResponse> {
		const password = hashSync(userData.password, 10);
		userData = {
			...userData,
			password,
		};

		return await this.usersRepository.create(userData);
	}

	async findAll(): Promise<TUserResponse[]> {
		return await this.usersRepository.findAll();
	}

	async findById(userId: string): Promise<TUserResponse> {
		return await this.usersRepository.findById(userId);
	}

	async findByCpf(userCpf: string): Promise<TUserResponse> {
		const userFind = await this.usersRepository.findByCpf(userCpf);
		
		return userFind;
	}

	async updateById(
		userId: string,
		newUserData: TUserUpdate
	): Promise<TUserResponse> {
		if (newUserData.password) {
			let password = newUserData.password;
			const isHashed = getRounds(password);

			if (!isHashed) password = hashSync(newUserData.password, 10);

			newUserData = {
				...newUserData,
				password,
			};
		}

		return await this.usersRepository.updateById(userId, newUserData);
	}

	async deleteById(userId: string): Promise<void> {
		return await this.usersRepository.deleteById(userId);
	}
}

export const usersService = new UsersServices(usersRepositories);
