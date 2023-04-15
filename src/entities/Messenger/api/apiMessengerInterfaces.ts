export interface ILastMessage {
    dialog_id: number,
    sender: string,
    content: string,
    timestamp: number | undefined
}

interface IDialogs {
    dialogs: {
        id: number,
        username1: string,
        username2: string
    }[],
    lastMessages: ILastMessage[] | undefined
}

export interface IGetDialogs {
    (token: string): Promise<IDialogs>
}