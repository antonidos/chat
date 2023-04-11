import { instance } from "shared/axiosInstance";

export const logout = async (token:string) => {
    const logout = await instance.get(`/auth/logout/${token}`);
    if (logout.data.data?.data) {
        return true
    }
    // if (logout.data.data?.info && logout.data.data?.info?.length) alert(logout.data.data.info)
    return false
}