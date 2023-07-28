import { TUser, TUserRequest, TUserResponse, TUserUpdate } from "../interfaces/users.interfaces";

export abstract class UsersRepositories {
    abstract create(userData: TUserRequest): Promise<TUserResponse>
    abstract findAll(): Promise<TUserResponse[]>
    abstract findById(userId: string): Promise<TUserResponse>
    abstract findByCpf(userCpf: string): Promise<TUserResponse>
    abstract updateById(userId: string, userData: TUserUpdate): Promise<TUserResponse>
    abstract deleteById(userId: string): Promise<void>
}

export abstract class UsersAbstractMiddlewares {
    abstract findById(userId: string): Promise<TUser>
    abstract findByEmail(email: string): Promise<TUser>
}