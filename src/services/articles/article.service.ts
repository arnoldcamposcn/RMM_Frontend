import { apiClient } from "../Instance";
import { type Article, type ArticleApiResponse, type ArticleCreate } from "../../schema/article/article";

export const getArticles = async (): Promise<Article[]> => {
    const response = await apiClient.get<ArticleApiResponse>("/articles/articulos/");
    return response.results;
  };

// Función para buscar artículos por título
export const searchArticles = async (searchTerm: string): Promise<Article[]> => {
    const response = await apiClient.get<ArticleApiResponse>(`/articles/articulos/?search=${encodeURIComponent(searchTerm)}`);
    return response.results;
  };

  export const getArticlesPaginated = async (page: number = 1, page_size: number = 6): Promise<ArticleApiResponse> => {
    const response = await apiClient.get<ArticleApiResponse>(`/articles/articulos/?page=${page}&page_size=${page_size}`);
    return response;
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


  export const createArticle = async (article: ArticleCreate): Promise<Article> => {
    const response = await apiClient.post<Article>("/articles/articulos/", article, {
      headers: {
        'Content-Type': article instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response;
  }


  export const patchArticle = async (id: number, article: ArticleCreate): Promise<Article> => {
    const response = await apiClient.patch<Article>(`/articles/articulos/${id}/`, article, {
      headers: {
        'Content-Type': article instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response;
  }

  export const deleteArticle = async (id: number): Promise<Article> => {
    const response = await apiClient.delete<Article>(`/articles/articulos/${id}/`);
    return response;
  }
  
  