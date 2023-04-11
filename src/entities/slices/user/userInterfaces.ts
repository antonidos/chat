export interface IPersonalInfo {
    age?: number,
    phone?: string,
    username: string,
    email: string
}

export interface IUserState {
    isLoggedIn: boolean,
    personalInfo: IPersonalInfo | null,
    userChats: string[]
}

export interface IRootState {
    user: IUserState;
}