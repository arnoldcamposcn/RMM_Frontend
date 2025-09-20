import { z } from "zod";

export const BlogSchema = z.object({
    id: z.number(),
    titulo_blog: z.string(),
    contenido: z.string(),
    imagen: z.string(),
    fecha_publicacion: z.string(),
});

// Schema para la respuesta paginada de blogs
export const BlogApiResponseSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(BlogSchema),
});

export type Blog = z.infer<typeof BlogSchema>;
export type BlogApiResponse = z.infer<typeof BlogApiResponseSchema>;

 