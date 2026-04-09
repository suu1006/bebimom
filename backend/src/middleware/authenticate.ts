import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UNAUTHENTICATED_ROUTE } from "../constants/clientRoutes";

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  // 1. 토큰 체크(AutAuthorization 헤더) - 토큰이 없으면, 401 
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "인증 토큰이 없습니다",
      route: UNAUTHENTICATED_ROUTE,
    });
  }

  // 2. 토큰 검증(jwt.verify) - 토큰이 만료되었거나 유효하지 않으면, 401
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      id: number;
      email: string;
    };
    req.user = payload;
    next();
  } catch {
    res.status(401).json({
      message: "토큰이 만료되었거나 유효하지 않습니다",
      route: UNAUTHENTICATED_ROUTE,
    });
  }
}
