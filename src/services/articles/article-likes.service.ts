import { apiClient } from "../Instance";
import { type ArticleLikes } from "../../schema/article/article";

// Obtener información de likes de un artículo específico
export const getArticleLikes = async (articleId: number): Promise<ArticleLikes> => {
  const response = await apiClient.get<ArticleLikes>(`/articles/articulos/${articleId}/likes_list/`);
  return response;
};

// Toggle like/unlike de un artículo
export const toggleArticleLike = async (articleId: number): Promise<void> => {
  await apiClient.post(`/articles/articulos/${articleId}/toggle_like/`);
};
