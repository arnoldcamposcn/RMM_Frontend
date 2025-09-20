import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, registerService } from "./auth.service";
import type { LoginRequest, RegisterRequest } from "./authSchema";
import { logout } from "../../../services/Instance";

// ----------------------------
// Thunk: Registro
// ----------------------------
export const registerUser = createAsyncThunk(
  "users/auth/registro-inicial",
  async (data: RegisterRequest, { dispatch, rejectWithValue }) => {
    try {
      // 1. Registrar usuario
      await registerService(data);

      // 2. Auto login con las credenciales registradas
      const loginPayload: LoginRequest = {
        email: data.email,
        password: data.password,
      };

      const loginResponse = await dispatch(loginUser(loginPayload)).unwrap();
      return loginResponse;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error en el registro");
    }
  }
);

// ----------------------------
// Thunk: Login
// ----------------------------
export const loginUser = createAsyncThunk(
  "users/auth/login",
  async (data: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await loginService(data);
      // 🚀 Los tokens se guardan automáticamente en Instance.ts (interceptor)
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error en el inicio de sesión");
    }
  }
);

// ----------------------------
// Thunk: Logout
// ----------------------------
export const logoutUser = createAsyncThunk("users/auth/logout", async () => {
  logout(); // Limpia cookies con access/refresh
  return true; // El reducer puede limpiar el estado del usuario
});
