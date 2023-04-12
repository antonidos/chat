import { ISearchValue } from "entities/slices/reduxInterfaces";
import { instance } from "shared/axiosInstance";

export const searchUsers = async (filter:string) => {
    const searchUsers = await instance.get(`/users/search_users/${filter}`)
    return searchUsers.data?.data?.data
}

export const timeOut = async (filter:string) => {
    const result = await searchUsers(filter);
    return new Promise<ISearchValue[]>((resolve) =>
        setTimeout(() => resolve(result), 700)
    );
}