interface IDialogs {
    dialogs: {
        id: number,
        username1: string,
        username2: string
    }[],
    lastMessages: {
        dialog_id: number,
        sender: number,
        content: string
    }[]
}

export interface IGetDialogs {
    (token: string): Promise<IDialogs>
}