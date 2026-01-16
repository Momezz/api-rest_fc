import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getUserByEmail } from '../../modules/user/user.services';
import { signAccessToken, verifyRefreshToken, signRefreshToken } from './auth.services';

/**
 * Returns a user and a JWT token signed by the app secret
 * @param req Request Request object
 * @param res Response Response object
 * @param next NextFunction Next function
 * @returns Promise<Response> Response object
 */

export async function handleLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) return res.status(404).json({ message: "Invalid credentials" });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const accessToken = signAccessToken({ id: user._id });
  const refreshToken = signRefreshToken({ id: user._id });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
  return res.json({ accessToken, refreshToken });
}

export async function handleRefreshToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.refresh_token;
  if (!token) return res.sendStatus(401);
  try {
    const payload = verifyRefreshToken(token) as { id: string };
    const accessToken = signAccessToken({ id: payload.id });
    return res.json({ accessToken });
  } catch {
    return res.sendStatus(403);
  }
}

export async function handleLogout(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      return res.status(200).json({ message: "User logged out" });
    }
    res.clearCookie("refresh_token", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

export async function handleGetProfile(req, res) {
  if (!req.user) return res.sendStatus(401);
  return res.json(req.user);
}

export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.sendStatus(403);
  }
}
