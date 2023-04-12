export interface IPersonalInfo {
    age?: number,
    phone?: string,
    username: string,
    email: string,
    id: number | null
}

export interface IUserState {
    isLoggedIn: boolean,
    personalInfo: IPersonalInfo | null,
    userChats: string[]
}

export interface ISearchValue {
    username: string,
    id: number
}

export interface ISearchState {
    value: ISearchValue[] | null,
    status: string
}

export interface IRootState {
    user: IUserState;
    search: ISearchState
}