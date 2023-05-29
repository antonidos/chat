export interface IPersonalInfo {
    age?: number,
    phone?: string,
    avatar?:string,
    username: string,
    email: string,
    id: number | null
}

export interface ISmallAvatar {
    src: string,
    username: string
}

export interface IChat {
    companion: string;
    formattedMessage: string;
    id: number,
    avatar: ISmallAvatar | undefined,
    timeLastMessage: number | undefined
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