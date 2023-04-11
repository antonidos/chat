export interface IUpdateInfoProps {
    (age: number, email: string, phone: string, token: string): Promise<boolean>;
}