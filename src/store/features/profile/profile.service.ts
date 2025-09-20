import { apiClient } from "../../../services/Instance";
import { type Profile } from "./profileSchema";

/**
 * GET /users/profile
 * Obtiene el perfil completo
 */
export const getProfile = async (): Promise<Profile> => {
  const response = await apiClient.get<Profile>("/users/profile");
  return response;
};

/**
 * PUT /users/profile
 * Reemplaza el perfil completo (requiere todos los campos)
 */
export const updateProfile = async (data: Profile): Promise<Profile> => {
  const response = await apiClient.put<Profile>("/users/profile", data);
  return response;
};

/**
 * PATCH /users/profile
 * Actualiza el perfil parcialmente (solo los campos enviados)
 */
export const patchProfile = async (
  data: Partial<Profile>
): Promise<Profile> => {
  const response = await apiClient.patch<Profile>("/users/profile", data);
  return response;
};
