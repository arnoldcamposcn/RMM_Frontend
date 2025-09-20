import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

// ----------------------------
// Config base
// ----------------------------
const API =
  (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000") + "/api/v1/";

// ----------------------------
// Helpers de cookies
// ----------------------------
const getAccess = () => Cookies.get("accessToken");
const getRefresh = () => Cookies.get("refreshToken");

export const setAccess = (token: string) =>
  Cookies.set("accessToken", token, {
    expires: 30, // 30 días
    sameSite: "lax",
    secure: import.meta.env.PROD,
    path: "/",
  });

  export const setRefresh = (token: string) =>
  Cookies.set("refreshToken", token, {
    expires: 30,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    path: "/",
  });

const clearTokens = () => {
  Cookies.remove("accessToken", { path: "/" });
  Cookies.remove("refreshToken", { path: "/" });
};

// ----------------------------
// Instancia base
// ----------------------------
const api: AxiosInstance = axios.create({
  baseURL: API,
  timeout: 30000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ----------------------------
// Request interceptor
// ----------------------------
api.interceptors.request.use((config) => {
  const token = getAccess();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ----------------------------
// Refresh token con cola
// ----------------------------
let isRefreshing = false;
let refreshQueue: Array<(newAccess: string) => void> = [];

const flushQueue = (token: string) => {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
};

api.interceptors.response.use(
  (res) => {
    // Guardar tokens al hacer login
    const url = res.config.url || "";
    if (url.includes("/auth/login")) {
      const data = res.data as { access?: string; refresh?: string };
      if (data.access) setAccess(data.access);
      if (data.refresh) setRefresh(data.refresh);
    }
    return res;
  },
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined;

    const url = (original?.url || "").toString();
    const isRefreshEndpoint = url.includes("/auth/refresh/");

    // Si no aplica refresh
    if (!original || status !== 401 || original._retry || isRefreshEndpoint) {
      return Promise.reject(error);
    }

    const refresh = getRefresh();
    if (!refresh) {
      clearTokens();
      return Promise.reject(
        new Error("Sesión expirada, vuelve a iniciar sesión.")
      );
    }

    original._retry = true;

    // Si ya hay un refresh en curso → encola
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push((newAccess) => {
          original.headers = original.headers ?? {};
          original.headers.Authorization = `Bearer ${newAccess}`;
          api(original).then(resolve).catch(reject);
        });
      });
    }

    // Ejecuta refresh único
    try {
      isRefreshing = true;

      const refreshResp = await axios.post<{ access: string }>(
        `${API}/auth/refresh/`,
        { refresh },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const newAccess = refreshResp.data?.access;
      if (!newAccess) throw new Error("No se pudo renovar el token.");

      setAccess(newAccess);
      flushQueue(newAccess);

      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
    } catch (e) {
      clearTokens();
      return Promise.reject(
        new Error("Sesión expirada, por favor inicia sesión nuevamente.")
      );
    } finally {
      isRefreshing = false;
    }
  }
);

// ----------------------------
// Cliente API simplificado
// ----------------------------
export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const { data: result } = await api.get<T>(url, config);
    return result;
  },
  post: async <T>(url: string, body?: unknown, config?: AxiosRequestConfig) => {
    const { data: result } = await api.post<T>(url, body, config);
    return result;
  },
  put: async <T>(url: string, body?: unknown, config?: AxiosRequestConfig) => {
    const { data: result } = await api.put<T>(url, body, config);
    return result;
  },
  patch: async <T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ) => {
    const { data: result } = await api.patch<T>(url, body, config);
    return result;
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const { data: result } = await api.delete<T>(url, config);
    return result;
  },
};

// ----------------------------
// Logout helper
// ----------------------------
export const logout = () => {
  clearTokens();
};

export default api;
