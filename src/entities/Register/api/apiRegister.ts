import { ILogin } from "entities/Login/api/apiLoginTypes";
import { instance } from "shared/axiosInstance";

export const login: ILogin = async (userName, password) => {
    const registration = await instance.post('/auth/registration', { userName, password })
    if (registration.data.data?.data) {
        localStorage.setItem('userToken', registration.data.data.data.token)
        return true;
    }
    if (registration.data.data.info) alert(registration.data.data.info)
    return false
}