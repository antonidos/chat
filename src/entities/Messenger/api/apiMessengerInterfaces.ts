interface IDialog {
    id: number,
    username1: string,
    username2: string
}

export interface IGetDialogs {
    (token:string): Promise<IDialog[]>
}