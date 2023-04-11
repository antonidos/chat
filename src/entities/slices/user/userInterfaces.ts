export interface IPersonalInfo {
    age?: number,
    phone?: string,
    name: string,
    email: string
}

export interface IUserState {
    isLoggedIn: boolean,
    userToken: string | null,
    personalInfo: IPersonalInfo | null,
    userChats: string[]
}

export interface IRootState {
    user: IUserState;
}