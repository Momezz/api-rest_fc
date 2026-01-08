import jwt, { SignOptions } from 'jsonwebtoken';

/**
 * return a JWT signed by the app secret
 * @param payload object | String Data to be signed
 * @returns token Strng
 */

interface JwtPayload {
  id: string;
}

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

export function signAccessToken(payload: object) {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_ACCESS_EXPIRES || "15m") as jwt.SignOptions["expiresIn"]
  };
  return jwt.sign(payload, accessSecret, options);
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, refreshSecret) as JwtPayload;
}

export function signRefreshToken(payload: object) {
  const expiresIn = process.env.JWT_REFRESH_EXPIRES || "7d";
  const options: SignOptions = {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"]
  };
  return jwt.sign(payload, refreshSecret, options);
}
