import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  first_name: z.string().nullable(),   // viene "" o null
  last_name: z.string().nullable(),
  fecha_nacimiento: z.string().nullable(),
  edad: z.number().nullable(),
  pais: z.string().nullable(),
  ciudad: z.string().nullable(),
  // genero: z.string().nullable(),
  perfil_url: z.string().nullable(),
  biografia: z.string().nullable(),
  facebook_url: z.string().nullable(),
  linkedin_url: z.string().nullable(),
  telefono: z.string().nullable(),    // mejor string que number
  usuario_unico: z.string(),
  perfil_completo: z.boolean(),
  fecha_creacion: z.string(),
  fecha_actualizacion: z.string(),
  usuario_unico_sugerido: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;
