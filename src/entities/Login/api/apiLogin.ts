import { instance } from "shared/axiosInstance";
import { ILogin } from "./apiLoginTypes";


export const login: ILogin = async (userName, password) => {
    const login = await instance.post('/auth/login', { userName, password })
    if (login.data.data?.data && login.data.result === "ok") {
        localStorage.setItem('userToken', login.data.data.data)
        return true
    }
    if (login.data.data?.info && login.data.data?.info.length) alert(login.data.data.info)
    return false
}