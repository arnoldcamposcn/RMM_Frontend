import { apiClient } from "../Instance";
import { type Blog, type BlogApiResponse } from "../../schema/blog/blog";

export const getBlogs = async (): Promise<Blog[]> => {
    const response = await apiClient.get<BlogApiResponse>("/blog/blogs/");
    return response.results;
  };


  export const getBlog = async (id: number): Promise<Blog> => {
    const response = await apiClient.get<Blog>(`/blog/blogs/${id}/`);
    return response;
  };


  // Función para obtener blogs limitados (para carrusel)
export const getRecentBlogs = async (limit: number = 8): Promise<Blog[]> => {
    const response = await apiClient.get<BlogApiResponse>(`/blog/blogs/?limit=${limit}`);
    return response.results;
  };
  