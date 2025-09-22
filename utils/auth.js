import { randomBytes, createHmac, timingSafeEqual } from 'node:crypto'

export function generateSalt(){
    return randomBytes(16).toString("hex");
}

export function hashPassword(password, salt){
    return createHmac("sha256", salt).update(password).digest("hex");
}

export function generateSessionToken(){
    return randomBytes(32).toString("hex");
}

export function safeCompare(hexA, hexB) {
  const a = Buffer.from(hexA, "hex");
  const b = Buffer.from(hexB, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}