import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "인증 토큰이 없습니다" });

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      id: number;
      email: string;
    };
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: "토큰이 만료되었거나 유효하지 않습니다" });
  }
}
