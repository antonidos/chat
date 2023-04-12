import { instance } from "shared/axiosInstance"
import { IUpdateInfoProps } from "./apiPersonalInterfaces"

export const getUserInfo = async (token:string) => {
    const getUserInfo = await instance.get(`/users/get_user_data/${token}`)
    
    if (getUserInfo.data?.data?.data) return getUserInfo.data.data.data
    if (getUserInfo.data.data.info) alert(getUserInfo.data.data.info)
    return false
}

export const updateUserInfo: IUpdateInfoProps = async (age, email, phone, token) => {
    const updateUserInfo = await instance.post('/users/update_user_info', { age, email, phone, token })
    if (updateUserInfo.data?.data?.data) return true;
    if (updateUserInfo.data.data.info) alert(updateUserInfo.data.data.info)
    return false;
}