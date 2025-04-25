export default interface Authentication {
    name: string;
    id: string;
    isDeactivated: boolean;
    isAdmin: boolean;
    iat: number;
    exp: number;
    iss: string;
}