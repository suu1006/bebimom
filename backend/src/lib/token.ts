import jwt from "jsonwebtoken";

/**jwt.sign()이 하는 일
payload + SECRET + 발급시각
    ↓
암호화 (HMACSHA256)
    ↓
eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.x7Kp... (JWT 문자열)
*/

// SECRET 두개로 보안강화
export function signAccessToken(payload: { id: number; email: string }) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });
}

export function signRefreshToken(payload: { id: number }) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
}

export function verifyRefreshToken(token: string): { id: number } {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { id: number };
}
