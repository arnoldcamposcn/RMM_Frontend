import { z } from "zod";

// Autor
export const autorSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  usuario_unico: z.string(),
});

// Categoría del foro
export const categoriaForoSchema = z.object({
  id: z.number(),
  nombre_categoria: z.string(),
  slug: z.string(),
});

// Schema para respuesta de API de categorías
export const foroCategoriasApiResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(categoriaForoSchema),
});

// Respuesta dentro de comentario (recursivo)
export const respuestaForoSchema: z.ZodType<any> = z.object({
  id: z.number(),
  tema: z.number(),
  autor: autorSchema,
  contenido: z.string(),
  parent: z.number().nullable(),
  creado_en: z.string(),
  respuestas: z.array(z.lazy((): z.ZodType<any> => respuestaForoSchema)),
  likes_count: z.number(),
});

// Comentarios del foro
export const comentarioForoSchema = z.object({
  id: z.number(),
  tema: z.number(),
  autor: autorSchema,
  contenido: z.string(),
  parent: z.number().nullable(),
  creado_en: z.string(),
  respuestas: z.array(respuestaForoSchema),
  likes_count: z.number(),
});

// Foro principal (tema del foro)
export const foroSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  contenido: z.string(),
  imagen: z.string(),
  autor: autorSchema,
  categoria_foro: categoriaForoSchema,
  creado_en: z.string(),
  actualizado_en: z.string(),
  comentarios: z.array(comentarioForoSchema),
  likes_count: z.number(),
});

// Schema para crear un tema de foro
export const createForoSchema = z.object({
  titulo: z.string(),
  contenido: z.string(),
  imagen: z.string().optional(),
  categoria_foro_id: z.number(),
});

// Schema para crear un comentario de foro
export const createForoCommentSchema = z.object({
  tema: z.number(),
  contenido: z.string(),
  parent: z.number().nullable().optional(),
});

// Schema para actualizar un comentario de foro
export const updateForoCommentSchema = z.object({
  id: z.number(),
  contenido: z.string(),
  creado_en: z.string(),
  autor: autorSchema,
});

// Schema para likes del foro
export const foroLikesSchema = z.object({
  user_liked: z.boolean(),
  total_likes: z.number(),
});

// Schema para likes de comentarios del foro
export const foroCommentLikesSchema = z.object({
  user_liked: z.boolean(),
  total_likes: z.number(),
});

// Respuesta de la API para temas del foro
export const foroApiResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(foroSchema),
});

// Respuesta de la API para comentarios del foro
export const foroCommentsApiResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(comentarioForoSchema),
});

// Types
export type Autor = z.infer<typeof autorSchema>;
export type CategoriaForo = z.infer<typeof categoriaForoSchema>;
export type RespuestaForo = z.infer<typeof respuestaForoSchema>;
export type ComentarioForo = z.infer<typeof comentarioForoSchema>;
export type Foro = z.infer<typeof foroSchema>;
export type CreateForo = z.infer<typeof createForoSchema>;
export type CreateForoComment = z.infer<typeof createForoCommentSchema>;
export type UpdateForoComment = z.infer<typeof updateForoCommentSchema>;
export type ForoLikes = z.infer<typeof foroLikesSchema>;
export type ForoCommentLikes = z.infer<typeof foroCommentLikesSchema>;
export type ForoApiResponse = z.infer<typeof foroApiResponseSchema>;
export type ForoCommentsApiResponse = z.infer<typeof foroCommentsApiResponseSchema>;
export type ForoCategoriasApiResponse = z.infer<typeof foroCategoriasApiResponseSchema>;
