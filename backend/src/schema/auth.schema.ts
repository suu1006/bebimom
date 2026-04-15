import { z } from "zod";

const passwordSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다")
    .regex(
      passwordSpecial,
      "비밀번호에 특수문자를 1개 이상 포함해주세요"
    ),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
