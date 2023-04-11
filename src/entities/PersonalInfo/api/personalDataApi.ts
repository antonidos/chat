import { instance } from "shared/axiosInstance"
import { IUpdateInfoProps } from "./apiPersonalInterfaces"

export const getUserInfo = async (token:string) => {
    const getUserInfo = await instance.get(`/users/get_user_data/${token}`)
    if (getUserInfo.data?.data?.data) return getUserInfo.data.data.data
    else return false
}

export const updateUserInfo: IUpdateInfoProps = async (age, email, phone, token) => {
    const updateUserInfo = await instance.post('/users/update_user_info', { age, email, phone, token })
    if (updateUserInfo.data?.data?.data) return true
    else return false;
}