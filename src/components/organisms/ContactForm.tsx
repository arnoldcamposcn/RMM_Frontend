import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../atoms/FormInput';
import { FormTextArea } from '../atoms/FormTextArea';
import { FormButton } from '../atoms/FormButton';
import { ContactFormSchema, type ContactFormData } from '../../schema/contact/contactSchema';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  className?: string;
}

export const ContactForm = ({ onSubmit, className = "" }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema)
  });

  const onFormSubmit = async (data: ContactFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      // Reset form on success
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={`bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 shadow-lg shadow-slate-200/20 relative overflow-hidden ${className}`}>
      {/* Elemento decorativo muy sutil en la esquina */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50/40 to-transparent rounded-bl-3xl"></div>
      
      <h2 className="text-3xl font-semibold text-slate-800 mb-8 relative">
        Déjanos un Mensaje
        {/* Pequeño accent muy sutil */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400/40 rounded-full"></div>
        <div className="absolute -bottom-1 left-0 w-20 h-0.5 bg-gradient-to-r from-blue-400/50 to-blue-300/20 rounded-full"></div>
      </h2>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5 relative z-10">
        <FormInput
          name="fullName"
          type="text"
          placeholder="Nombre Completo*"
          register={register}
          error={errors.fullName}
          required
        />

        <FormInput
          name="email"
          type="email"
          placeholder="Correo Electrónico*"
          register={register}
          error={errors.email}
          required
        />

        <FormInput
          name="phone"
          type="tel"
          placeholder="Teléfono*"
          register={register}
          error={errors.phone}
          required
        />

        <FormInput
          name="website"
          type="url"
          placeholder="Página Web"
          register={register}
          error={errors.website}
        />

        <FormTextArea
          name="message"
          rows={6}
          placeholder="Tu Mensaje*"
          register={register}
          error={errors.message}
          required
        />

        <FormButton
          type="submit"
          loading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </FormButton>
      </form>
    </div>
  );
};

export type { ContactFormData };
