import { apiClient } from "../Instance";
import { type Magazine, type MagazineApiResponse } from "../../schema/magazine/magazine";

// Obtiene la última edición para la página principal
export const getMagazines = async (): Promise<Magazine> => {
    const response = await apiClient.get<Magazine>("/magazine/editions/last/");
    return response;
  };

// Obtiene TODAS las ediciones (respuesta paginada)
export const getAllMagazines = async (): Promise<Magazine[]> => {
    const response = await apiClient.get<MagazineApiResponse>("/magazine/editions/");
    return response.results;
  };
