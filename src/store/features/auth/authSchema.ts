// schemas.ts
import { z } from "zod";

// REGISTRO
export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirm_password: z.string().min(8),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = z.object({
  access: z.string(),
});


export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

// INICIO DE SESION
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  access: z.string(),
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;


// USUARIO
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});
export type User = z.infer<typeof UserSchema>;


// REQUEST PASSWORD RESET
export const RequestPasswordResetRequestSchema = z.object({
  email: z.string().email(),
});
export type RequestPasswordResetRequest = z.infer<typeof RequestPasswordResetRequestSchema>;

export const RequestPasswordResetResponseSchema = z.object({
  message: z.string(),
});
export type RequestPasswordResetResponse = z.infer<typeof RequestPasswordResetResponseSchema>;

  // RESET PASSWORD
export const ResetPasswordRequestSchema = z.object({
  uid: z.string(),
  token: z.string(),
  new_password: z.string(),
  confirm_password: z.string(),
});
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

export const ResetPasswordResponseSchema = z.object({
  message: z.string(),
});
export type ResetPasswordResponse = z.infer<typeof ResetPasswordResponseSchema>;
