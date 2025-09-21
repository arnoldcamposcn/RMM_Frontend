import api from "../Instance";
import { 
  foroSchema, 
  foroLikesSchema,
  foroCommentLikesSchema,
  type Foro, 
  type ForoApiResponse,
  type ComentarioForo,
  type ForoCommentsApiResponse,
  type CreateForo,
  type CreateForoComment,
  type UpdateForoComment,
  type ForoLikes,
  type ForoCommentLikes,
  type CategoriaForo,
  type ForoCategoriasApiResponse
} from "../../schema/foro/foro";

// Obtener todos los temas del foro
export const getForo = async (): Promise<Foro[]> => {
    const response = await api.get<ForoApiResponse>("/foro/temas/");
    return response.data.results;
};

// Crear un nuevo tema del foro
export const createForo = async (foro: CreateForo): Promise<Foro> => {
    const response = await api.post<Foro>("/foro/temas/", foro);
    return foroSchema.parse(response.data);
};

// Obtener un tema del foro por ID
export const getForoById = async (id: number): Promise<Foro> => {
    const response = await api.get<Foro>(`/foro/temas/${id}/`);
    return foroSchema.parse(response.data);
};

// Actualizar un tema del foro
export const updateForo = async (id: number, foro: Partial<CreateForo>): Promise<Foro> => {
    const response = await api.patch<Foro>(`/foro/temas/${id}/`, foro);
    return foroSchema.parse(response.data);
};

// Eliminar un tema del foro
export const deleteForo = async (id: number): Promise<void> => {
    await api.delete(`/foro/temas/${id}/`);
};

// Likes del foro (temas)

export const getForoLikesList = async (id: number): Promise<ForoLikes> => {
    const response = await api.get<ForoLikes>(`/foro/temas/${id}/likes_list/`);
    return foroLikesSchema.parse(response.data);
};

export const toggleForoLike = async (id: number): Promise<void> => {
    await api.post(`/foro/temas/${id}/toggle_like/`);
};


// Comentarios del foro

// Obtener todos los comentarios del foro
export const getForoComments = async (): Promise<ComentarioForo[]> => {
    const response = await api.get<ForoCommentsApiResponse>(`/foro/comentarios/`);
    return response.data.results;
};

// Crear un nuevo comentario del foro
export const createForoComment = async (comment: CreateForoComment): Promise<ComentarioForo> => {
    const response = await api.post<ComentarioForo>(`/foro/comentarios/`, comment);
    return response.data;
};

// Obtener un comentario del foro por ID
export const getForoCommentById = async (id: number): Promise<ComentarioForo> => {
    const response = await api.get<ComentarioForo>(`/foro/comentarios/${id}/`);
    return response.data;
};

// Actualizar un comentario del foro
export const updateForoComment = async (id: number, comment: Partial<UpdateForoComment>): Promise<ComentarioForo> => {
    const response = await api.patch<ComentarioForo>(`/foro/comentarios/${id}/`, comment);
    return response.data;
};

// Eliminar un comentario del foro
export const deleteForoComment = async (id: number): Promise<void> => {
    await api.delete(`/foro/comentarios/${id}/`);
};

// Comentarios específicos de un tema del foro

export const getForoCommentsByTema = async (id: number): Promise<ComentarioForo[]> => {
    const response = await api.get<ForoCommentsApiResponse>(`/foro/temas/${id}/comentarios/`);
    return response.data.results;
};

// Likes de comentarios del foro

export const getForoCommentsLikesList = async (id: number): Promise<ForoCommentLikes> => {
    const response = await api.get<ForoCommentLikes>(`/foro/comentarios/${id}/likes_list/`);
    return foroCommentLikesSchema.parse(response.data);
};

export const toggleForoCommentsLike = async (id: number): Promise<void> => {
    await api.post(`/foro/comentarios/${id}/toggle_like/`);
};

// Categorías del foro

export const getForoCategorias = async (): Promise<CategoriaForo[]> => {
    const response = await api.get<ForoCategoriasApiResponse>(`/foro/categorias/`);
    return response.data.results;
};
