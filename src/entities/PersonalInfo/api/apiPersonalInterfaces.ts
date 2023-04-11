export interface IUpdateInfoProps {
    (age: number | null, email: string | null, phone: string | null, token: string | null): Promise<boolean>;
}