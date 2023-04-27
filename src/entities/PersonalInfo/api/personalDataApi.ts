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

export const saveAvatar = async (token: string, avatar: File) => {
    const data = new FormData();
    data.append('token', token);
    data.append('avatar', avatar, avatar.name);
    console.log(data)
    const saveResponse = await instance.post('/users/save_avatar', data)
    if (saveResponse.data?.data?.data) return true;
    if (saveResponse.data.data.info) alert(saveResponse.data.data.info)
    return false;
}

export const getAvatar = async (token: string) => {
    const saveResponse = await instance.get(`/users/get_avatar/${token}`)
    if (saveResponse.data?.data?.data) return saveResponse.data?.data?.data;
    if (saveResponse.data.data.info) alert(saveResponse.data.data.info)
    return false;
}

export const deleteAvatar = async (token: string) => {
    const deleteResponse = await instance.get(`/users/remove_avatar/${token}`)
    if (deleteResponse.data?.data?.data) return deleteResponse.data?.data?.data;
    if (deleteResponse.data.data.info) alert(deleteResponse.data.data.info)
    return false;
}