import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

// This function returns the decoded data if valid, or null if invalid
export default async function getAuthenticationState(): Promise<jwt.JwtPayload | null> {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value as string;
    const key = process.env.JWT_SECRET as string;

    try {
        const decoded = jwt.verify(token, key);
        if (decoded) return decoded as JwtPayload;
    } catch {
        return null;
    }
    return null;
}