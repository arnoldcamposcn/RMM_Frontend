import { z } from 'zod';

export const magazineSchema = z.object({
    id: z.number(),
    numero_edicion: z.number(),
    titulo_edicion: z.string(),
    contenido: z.string(),
    imagen: z.string(),
    fecha_publicacion: z.string(),
    url_impresa: z.string(),
});

export const magazineApiResponseSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(magazineSchema),
});

export type Magazine = z.infer<typeof magazineSchema>;
export type MagazineApiResponse = z.infer<typeof magazineApiResponseSchema>;
