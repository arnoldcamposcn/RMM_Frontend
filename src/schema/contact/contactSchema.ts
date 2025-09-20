import { z } from 'zod';

export const ContactFormSchema = z.object({
  fullName: z.string()
    .min(1, 'El nombre completo es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  
  email: z.string()
    .min(1, 'El correo electrónico es requerido')
    .email('El correo electrónico no es válido'),
  
  phone: z.string()
    .min(1, 'El teléfono es requerido')
    .min(8, 'El teléfono debe tener al menos 8 dígitos'),
  
  website: z.string()
    .optional()
    .refine((val) => !val || /^https?:\/\/.+/.test(val), {
      message: 'La URL debe incluir http:// o https://'
    }),
  
  message: z.string()
    .min(1, 'El mensaje es requerido')
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
