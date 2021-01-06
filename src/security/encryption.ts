import crypto from "crypto";

export const generateSaltKey = () => {
    const buf = crypto.randomBytes(32);
    return buf.toString("base64");
}

export const generatePassword = (password: string, salt: string) => {
    const key = crypto.scryptSync(password, salt, 64, {N:1024}).toString("hex");
    return key;
}