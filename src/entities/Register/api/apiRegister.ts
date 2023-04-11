import { instance } from "shared/axiosInstance";
import { IRegister } from "./apiRegisterTypes";

export const register: IRegister = async (userName, password, email) => {
    const registration = await instance.post('/auth/registration', { userName, password, email })
    if (registration.data.data?.data) {
        localStorage.setItem('userToken', registration.data.data.data.token)
        return true;
    }
    if (registration.data.data.info) alert(registration.data.data.info)
    return false
}