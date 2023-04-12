import { instance } from "shared/axiosInstance";

export const getSettings = async (token: string) => {
    const getSettings = await instance.get(`/settings/get_user_settings/${token}`);
    if (getSettings.data.data?.data) {
        return true
    }
    if (getSettings.data.data?.info && getSettings.data.data?.info?.length) alert(getSettings.data.data.info)
    return false
}

export const setSettings = async (token: string, theme: string, notifications: string) => {
    const setSettings = await instance.post(`/settings/change_user_settings`, {token, theme, notifications});
    if (setSettings.data.data?.data) {
        return true
    }
    if (setSettings.data.data?.info && setSettings.data.data?.info?.length) alert(setSettings.data.data.info)
    return false
}