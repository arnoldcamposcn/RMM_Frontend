import { apiClient } from "../Instance";
import { 
  type ArticlePostComment, 
  type ArticleCreateComment, 
  type ArticleUpdateComment,
  type ArticleCommentsApiResponse 
} from "../../schema/article/article";

// Obtener comentarios de un artículo específico
export const getCommentsByArticleId = async (articleId: number): Promise<ArticlePostComment[]> => {
  const response = await apiClient.get<ArticleCommentsApiResponse>(`/articles/articulos/${articleId}/comentarios/`);
  return response.results;
};

// Obtener todos los comentarios (sin filtrar por artículo)
export const getAllArticleComments = async (): Promise<ArticlePostComment[]> => {
  const response = await apiClient.get<ArticleCommentsApiResponse>("/articles/comentarios/");
  return response.results;
};

// Crear un nuevo comentario
export const createArticleComment = async (commentData: ArticleCreateComment): Promise<ArticlePostComment> => {
  const response = await apiClient.post<ArticlePostComment>("/articles/comentarios/", commentData);
  return response;
};

// Obtener un comentario específico por ID
export const getArticleComment = async (commentId: number): Promise<ArticlePostComment> => {
  const response = await apiClient.get<ArticlePostComment>(`/articles/comentarios/${commentId}/`);
  return response;
};

// Actualizar un comentario (PUT - reemplazo completo)
export const updateArticleComment = async (commentId: number, commentData: ArticleUpdateComment): Promise<ArticlePostComment> => {
  const response = await apiClient.put<ArticlePostComment>(`/articles/comentarios/${commentId}/`, commentData);
  return response;
};

// Actualizar parcialmente un comentario (PATCH - actualización parcial)
export const patchArticleComment = async (commentId: number, commentData: Partial<ArticleUpdateComment>): Promise<ArticlePostComment> => {
  const response = await apiClient.patch<ArticlePostComment>(`/articles/comentarios/${commentId}/`, commentData);
  return response;
};

// Eliminar un comentario
export const deleteArticleComment = async (commentId: number): Promise<void> => {
  await apiClient.delete(`/articles/comentarios/${commentId}/`);
};
