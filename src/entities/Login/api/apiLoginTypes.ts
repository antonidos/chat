export interface ILogin {
    (userName: string, password:string): Promise<boolean>
}