import { z } from "zod";

export const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Tên đăng nhập hoặc email là bắt buộc"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string().min(1, "Tên người dùng là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
