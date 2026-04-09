import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // 어느파일, 몇번째줄, 어떤 함수 호출 순서로 왔는지 나옴(message는 한줄메세지만 표기됨)
  console.error(err.stack);
  res.status(500).json({ message: "서버 오류가 발생했습니다" });
}
