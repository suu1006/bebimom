/** 회원가입 비밀번호: 8자 이상 + 특수문자 1개 이상 (백엔드 zod와 동일 규칙) */
const PASSWORD_SPECIAL = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export function isValidSignupPassword(password: string): boolean {
  return password.length >= 8 && PASSWORD_SPECIAL.test(password);
}

export const SIGNUP_PASSWORD_RULE_MESSAGE =
  "비밀번호는 8자 이상이며 특수문자를 1개 이상 포함해야 합니다";
