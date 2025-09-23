// auth.service.ts
import { apiClient } from "../../../services/Instance";  
import {
  type RegisterRequest,
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
  type RequestPasswordResetResponse,
  type RequestPasswordResetRequest,
  type ResetPasswordRequest,
  type ResetPasswordResponse,
} from "./authSchema";

// ----------------------------
// Registro
// ----------------------------
export const registerService = async (
  payload: RegisterRequest
): Promise<RegisterResponse> => {
  return await apiClient.post<RegisterResponse>(
    "users/auth/registro-inicial",
    payload
  );
};

// ----------------------------
// Login
// ----------------------------
export const loginService = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  return await apiClient.post<LoginResponse>("users/auth/login", payload);
};



// --- Request Password Reset ---
export const requestPasswordResetService = async (comment: RequestPasswordResetRequest): Promise<RequestPasswordResetResponse> => {
  const response = await apiClient.post<RequestPasswordResetResponse>("/users/auth/request-password-reset/", comment);
  return response;
};
// ----------------------------
// Request Password Reset
// ----------------------------
// Reset Password Confirm
export const resetPasswordConfirmService = async (
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await apiClient.post<ResetPasswordResponse>(
    "/users/auth/reset-password-confirm/",
    data
  );
  return response;
};


