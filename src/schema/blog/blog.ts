import { z } from "zod";

export const BlogSchema = z.object({
    id: z.number(),
    titulo_blog: z.string(),
    contenido: z.string(),
    imagen_principal: z.string(),
    banner: z.string(),
    fecha_publicacion: z.string(),
    likes_count: z.number().optional(),
    is_liked: z.boolean().optional(),
});

// Schema para la respuesta paginada de blogs
export const BlogApiResponseSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(BlogSchema),
});


export const CreateCommentSchema = z.object({
    blog: z.number(),
    contenido: z.string().min(1, "El comentario no puede estar vacío"),
    parent: z.number().nullable().optional(), // null si es raíz
  });

// --- Schemas Comentarios ---
const AutorSchema = z.object({
    id: z.number(),
    email: z.string(),
    usuario_unico: z.string(),
  });
  
  // Definición base del comentario
  const BaseCommentSchema = z.object({
    id: z.number(),
    contenido: z.string(),
    creado_en: z.string(),
    autor: AutorSchema,
    parent: z.number().nullable().optional(),
    likes_count: z.number().optional(),
    is_liked: z.boolean().optional(),
  });

  // Schema completo con respuestas anidadas (usando any temporalmente para evitar recursión circular)
  export const PostCommentSchema = BaseCommentSchema.extend({
    respuestas: z.array(z.any()).optional(),
  });
  
  // Schema para la respuesta paginada de comentarios
  export const PostCommentApiResponseSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(PostCommentSchema),
  });

// --- Schema para likes del blog ---
export const BlogLikeSchema = z.object({
  id: z.number(),
  usuario: z.object({
    id: z.number(),
    email: z.string(),
    usuario_unico: z.string(),
  }),
  creado_en: z.string(),
});

export const BlogLikesResponseSchema = z.object({
  blog: z.object({
    id: z.number(),
    titulo: z.string(),
    likes_count: z.number(),
  }),
  likes_list: z.array(BlogLikeSchema),
  current_user: z.object({
    id: z.number(),
    email: z.string(),
    usuario_unico: z.string(),
  }).nullable(),
  user_liked: z.boolean(),
  total_likes: z.number(),
});

  
  // --- Tipos inferidos ---
  export type Blog = z.infer<typeof BlogSchema>;
  export type BlogApiResponse = z.infer<typeof BlogApiResponseSchema>;
  export type PostComment = z.infer<typeof PostCommentSchema>;
  export type PostCommentApiResponse = z.infer<typeof PostCommentApiResponseSchema>;
  export type CreateComment = z.infer<typeof CreateCommentSchema>;
  export type BlogLike = z.infer<typeof BlogLikeSchema>;
  export type BlogLikesResponse = z.infer<typeof BlogLikesResponseSchema>;
