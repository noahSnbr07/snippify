import getAuthentication from "./get-authentication";

export default async function getTokenExpiration(): Promise<string | null> {

    //retrieve and handle authentication state
    const authentication = await getAuthentication();
    if (!authentication || !authentication.exp) return null;

    //format and return date/ time of expiration
    const expiration = new Date(authentication.exp * 1000).toLocaleString();
    return expiration;
}