import { apiClient } from "../Instance";
import { type Article, type ArticleApiResponse } from "../../schema/article/article";

export const getArticles = async (): Promise<Article[]> => {
    const response = await apiClient.get<ArticleApiResponse>("/articles/articulos/");
    return response.results;
  };

// Función para obtener artículos limitados (para carrusel)
export const getRecentArticles = async (limit: number = 8): Promise<Article[]> => {
    const response = await apiClient.get<ArticleApiResponse>(`/articles/articulos/?limit=${limit}`);
    return response.results;
  };

  export const getArticle = async (id: number): Promise<Article> => {
    const response = await apiClient.get<Article>(`/articles/articulos/${id}/`);
    return response;
  };