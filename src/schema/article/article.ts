import { z } from "zod";

export const ArticleSchema = z.object({
    id: z.number(),
    titulo_articulo: z.string(),
    contenido: z.string(),
    imagen_principal: z.string(),
    banner: z.string(),
    fecha_publicacion: z.string(),
});

// Schema para la respuesta paginada de artículos
export const ArticleApiResponseSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(ArticleSchema),
});

// Schemas para comentarios de artículos
export const ArticleCommentAuthorSchema = z.object({
    id: z.number(),
    email: z.string(),
    usuario_unico: z.string(),
});

export const ArticlePostCommentSchema: z.ZodType<any> = z.object({
    id: z.number(),
    contenido: z.string(),
    creado_en: z.string(),
    autor: ArticleCommentAuthorSchema,
    articulo: z.number(),
    parent: z.number().nullable(),
    respuestas: z.array(z.lazy((): z.ZodType<any> => ArticlePostCommentSchema)).optional(),
});

export const ArticleCreateCommentSchema = z.object({
    articulo: z.number(),
    contenido: z.string(),
    parent: z.number().nullable().optional(),
});

export const ArticleUpdateCommentSchema = z.object({
    id: z.number(),
    contenido: z.string(),
    creado_en: z.string(),
    autor: ArticleCommentAuthorSchema,
});

// Schema para likes de artículos
export const ArticleLikesSchema = z.object({
    user_liked: z.boolean(),
    total_likes: z.number(),
});

// Schema para respuesta paginada de comentarios de artículos
export const ArticleCommentsApiResponseSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(ArticlePostCommentSchema),
});

export const ArticleCreateSchema = z.object({
    titulo_articulo: z.string().min(3, "El título del artículo es requerido"),
    contenido: z.string().min(10, "El contenido del artículo es requerido"),
    imagen_principal: z.instanceof(File, { message: "La imagen principal es requerida" }), 
    banner: z.instanceof(File, { message: "El banner es requerido" }),
    fecha_publicacion: z.string().min(1, "La fecha de publicación es requerida"),
    categoria_articulo: z.number(),
});


export type Article = z.infer<typeof ArticleSchema>;
export type ArticleApiResponse = z.infer<typeof ArticleApiResponseSchema>;
export type ArticlePostComment = z.infer<typeof ArticlePostCommentSchema>;
export type ArticleCreateComment = z.infer<typeof ArticleCreateCommentSchema>;
export type ArticleUpdateComment = z.infer<typeof ArticleUpdateCommentSchema>;
export type ArticleLikes = z.infer<typeof ArticleLikesSchema>;
export type ArticleCommentsApiResponse = z.infer<typeof ArticleCommentsApiResponseSchema>;
export type ArticleCreate = z.infer<typeof ArticleCreateSchema>;