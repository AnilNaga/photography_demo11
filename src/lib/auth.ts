import { compare, hash } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "super-secret-default-key-change-this"
);

export async function hashPassword(password: string) {
    return await hash(password, 12);
}

export async function verifyPassword(plain: string, hashed: string) {
    return await compare(plain, hashed);
}

export async function signToken(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
    } catch (error) {
        return null;
    }
}
