import { apiClient } from "../Instance";
import { type CreateMagazine, type Magazine, type MagazineApiResponse } from "../../schema/magazine/magazine";

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

  export const getMagazinesPaginated = async (page: number = 1, page_size: number = 6): Promise<MagazineApiResponse> => {
    const response = await apiClient.get<MagazineApiResponse>(`/magazine/editions/?page=${page}&page_size=${page_size}`);
    return response;
  };

  export const createMagazine = async (magazine: CreateMagazine | FormData): Promise<Magazine> => {
    const response = await apiClient.post<Magazine>("/magazine/editions/", magazine, {
      headers: {
        'Content-Type': magazine instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response;
  }


  export const patchMagazine = async (id: number, magazine: CreateMagazine | FormData): Promise<Magazine> => {
    const response = await apiClient.patch<Magazine>(`/magazine/editions/${id}/`, magazine, {
      headers: {
        'Content-Type': magazine instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response;
  }
  

  export const deleteMagazine = async (id: number): Promise<Magazine> => {
    const response = await apiClient.delete<Magazine>(`/magazine/editions/${id}/`);
    return response;
  }
  