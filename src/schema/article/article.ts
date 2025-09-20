import { z } from "zod";

export const ArticleSchema = z.object({
    id: z.number(),
    titulo_articulo: z.string(),
    contenido: z.string(),
    imagen: z.string(),
    fecha_publicacion: z.string(),
});

// Schema para la respuesta paginada de artículos
export const ArticleApiResponseSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(ArticleSchema),
});

export type Article = z.infer<typeof ArticleSchema>;
export type ArticleApiResponse = z.infer<typeof ArticleApiResponseSchema>;

 