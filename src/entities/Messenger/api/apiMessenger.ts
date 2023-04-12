import { instance } from "shared/axiosInstance";
import { IGetDialogs } from "./apiMessengerInterfaces";

export const getDialogs:IGetDialogs = async (token) => {
    const dialogs = await instance.get(`/dialogs/get_dialogs_of_user/${token}`)
    return dialogs.data?.data?.data
}

export const addDialog = async (token: string, username: string) => {
    const addDialog = await instance.post('/dialogs/add_dialog', { token, username });
    if (addDialog.data?.error) {
        alert("Произошла ошибка")
        return false
    }
    if (addDialog.data?.result === "error" || addDialog.data?.result === "false") return false
    return addDialog.data?.data?.data
}

export const deleteDialog = async (token: string, username: string) => {
    const deleteDialog = await instance.post('/dialogs/delete_dialog', { token, username });
    if (deleteDialog.data?.error) {
        alert("Произошла ошибка")
        return false
    }
    if (deleteDialog.data?.result === "error" || deleteDialog.data?.result === "false") return false
    return true
}

export const addMessage = async (token: string, chatId: number, content: string) => {
    const addDialog = await instance.post('/messages/add_message', { token, chatId, content });
    if (addDialog.data?.error) {
        alert("Произошла ошибка")
        return false
    }
    if (addDialog.data?.result === "error" || addDialog.data?.result === "false") return false
    return true
}

export const getChat = async (chatId: number) => {
    const getChat = await instance.get(`/messages/get_chat/${chatId}`);
    if (getChat.data?.error) {
        alert("Произошла ошибка")
        return false
    }
    if (getChat.data?.result === "error" || getChat.data?.result === "false") return false
    return getChat.data?.data?.data
}