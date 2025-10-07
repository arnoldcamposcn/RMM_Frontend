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



export const createMagazineSchema = z.object({
    numero_edicion: z.number().int().positive(), // entero positivo
    titulo_edicion: z.string().min(3, "El título debe tener al menos 3 caracteres"),
    contenido: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
    imagen: z.instanceof(File, { message: "Debe ser un archivo válido" }), 
    fecha_publicacion: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "La fecha de publicación debe ser válida (YYYY-MM-DD)",
      }),
    url_impresa: z.string().url("La URL impresa debe ser válida"),
  });
  
  export type CreateMagazine = z.infer<typeof createMagazineSchema>;
