export interface IUserContext {
    userLogin: (data: ILoginData) => Promise<void>,
    userLogout: () => void,
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
