export interface IUserContext {
    userLogin: (data: ILoginData) => Promise<void>,
    userLogout: () => void,
    userRegister: (registerData: IRegisterData) => Promise<void>,
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
    retrieveUserData: () => Promise<void>,
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

export interface IRegisterData extends ILoginData {
    username: string,
    cpf: string
}