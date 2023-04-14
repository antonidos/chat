export interface IPersonalInfo {
    age?: number,
    phone?: string,
    username: string,
    email: string,
    id: number | null
}

export interface IChat {
    companion: string;
    formattedMessage: string;
    id: number
}[]

export interface IUserState {
    isLoggedIn: boolean,
    personalInfo: IPersonalInfo | null,
    userChats: IChat[]
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