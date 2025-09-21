import { apiClient } from "../Instance";
import { type Blog, type BlogApiResponse, type CreateComment, type PostComment, type PostCommentApiResponse, type BlogLikesResponse } from "../../schema/blog/blog";
import { type Article } from "../../schema/article/article";

// --- Blogs ---
export const getBlogs = async (): Promise<Blog[]> => {
  const response = await apiClient.get<BlogApiResponse>("/blog/blogs/");
  return response.results;
};

// --- Blog por id ---
export const getBlog = async (id: number): Promise<Blog> => {
  const response = await apiClient.get<Blog>(`/blog/blogs/${id}/`);
  return response;
};

// --- Blogs limitados ---
// Función para obtener blogs limitados (para carrusel)
export const getRecentBlogs = async (limit: number = 8): Promise<Blog[]> => {
  const response = await apiClient.get<BlogApiResponse>(`/blog/blogs/?limit=${limit}`);
  return response.results;
};

// --- Artículos relacionados ---
export const ArticlesRelated = async (id: number): Promise<Article[]> => {
  const response = await apiClient.get<Article[]>(`/blog/blogs/${id}/articulos/`);
  return response;
};

// --- Comentarios ---
export const getComments = async (): Promise<PostComment[]> => {
  const response = await apiClient.get<PostCommentApiResponse>("/blog/comentarios/");
  return response.results;
};

// --- Crear comentario ---
export const createComment = async (comment: CreateComment): Promise<PostComment> => {
  const response = await apiClient.post<PostComment>("/blog/comentarios/", comment);
  return response;
};


export const getComment = async (id: number): Promise<PostComment> => {
  const response = await apiClient.get<PostComment>(`/blog/comentarios/${id}/`);
  return response;
};

// lista de comentarios por blog
export const getCommentsByBlogId = async (id: number): Promise<PostComment[]> => {
  const response = await apiClient.get<PostCommentApiResponse>(`/blog/blogs/${id}/comentarios/`);
  return response.results;
};

// Editar comentario
export const patchComment = async (id: number, comment: PostComment): Promise<PostComment> => {
  const response = await apiClient.patch<PostComment>(`/blog/comentarios/${id}/`, comment);
  return response;
};

// --- Eliminar comentario ---
export const deleteComment = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`/blog/comentarios/${id}/`);
};


// --- Toggle like ---
export const toggleLike = async (id: number): Promise<void> => {
  await apiClient.post<void>(`/blog/blogs/${id}/toggle_like/`);
};



// Obtener información completa de likes del blog
export const getBlogLikes = async (id: number): Promise<BlogLikesResponse> => {
  const response = await apiClient.get<BlogLikesResponse>(`/blog/blogs/${id}/likes_list/`);
  return response;
};



