import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// This secret signs the tokens. In production it MUST come from an
// environment variable — never hardcode a real secret here.
const JWT_SECRET = process.env.JWT_SECRET || "dev-only-secret-change-me";

export type SessionPayload = {
  adminId: string;
};

// Turns a plain-text password into a one-way hash before it ever
// touches the database. We never store the real password anywhere.
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compares a login attempt's password against the stored hash.
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Creates a signed token containing just enough info to identify the
// user on future requests. Expires in 7 days.
export function signSession(payload: SessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

// Reads a token back out and confirms it hasn't been tampered with or
// expired. Returns null (rather than throwing) on anything invalid,
// so callers can just check "is there a session?".
export function verifySession(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}
