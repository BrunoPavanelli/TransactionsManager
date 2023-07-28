export interface IUserContext {
    userLogin: (data: ILoginData) => Promise<void>,
}

export interface IUser {
    id: string,
    email: string,
    username: string,
    role: string,
}

export interface ILoginData {
    email: string,
    password: string
}