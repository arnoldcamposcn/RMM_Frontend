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