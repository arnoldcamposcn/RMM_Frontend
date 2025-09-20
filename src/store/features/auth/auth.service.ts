// auth.service.ts
import { apiClient } from "../../../services/Instance";
import {
  type RegisterRequest,
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
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
