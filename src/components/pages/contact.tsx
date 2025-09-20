import { ContactForm, type ContactFormData } from '../organisms/ContactForm';

export const ContactPage = () => {
  const handleFormSubmit = async (data: ContactFormData) => {
    // Aquí se implementaría la lógica para enviar el formulario
    console.log('Form submitted:', data);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Aquí podrías hacer una llamada a tu API
    // await api.sendContactForm(data);
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
        {/* Elementos decorativos sutiles de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Burbujas muy sutiles */}
          <div className="absolute top-32 left-16 w-64 h-64 bg-blue-50 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-32 right-20 w-48 h-48 bg-indigo-50 rounded-full opacity-15 blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-slate-100 rounded-full opacity-8 blur-xl"></div>
          
          {/* Líneas decorativas muy suaves */}
          <div className="absolute top-1/4 left-0 w-96 h-px bg-gradient-to-r from-transparent via-slate-200/30 to-transparent"></div>
          <div className="absolute bottom-1/3 right-0 w-80 h-px bg-gradient-to-l from-transparent via-blue-200/20 to-transparent"></div>
        </div>

        <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Columna izquierda - Información de la oficina */}
            <div className="py-8 px-6 relative">
              {/* Elemento decorativo lateral muy sutil */}
              <div className="absolute -left-1 top-8 w-1 h-24 bg-gradient-to-b from-blue-200/40 to-transparent rounded-full"></div>
              
              <div className="mb-8 relative">
                <div className="flex items-center mb-5">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-70"></div>
                  <span className="text-blue-600/80 text-sm font-medium uppercase tracking-wider">¿Cómo podemos ayudarte?</span>
                  {/* Línea decorativa suave */}
                  <div className="ml-6 flex-1 h-px bg-gradient-to-r from-blue-200/40 to-transparent"></div>
                </div>
                <h2 className="text-3xl font-semibold text-slate-800 mb-5 relative">
                  Información de la Oficina
                  {/* Accent line muy suave */}
                  <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-blue-400/60 to-blue-300/30 rounded-full"></div>
                </h2>
                <p className="text-slate-600 leading-relaxed relative pl-3">
                  {/* Barra lateral decorativa muy sutil */}
                  <div className="absolute left-0 top-1 w-0.5 h-full bg-gradient-to-b from-blue-300/30 to-transparent rounded-full"></div>
                  Cuando una impresora desconocida tomó una galerada de tipos y la mezcló para hacer un libro de muestras de tipos. 
                  No solo ha sobrevivido cinco siglos, sino que también dio el salto a la composición tipográfica electrónica, 
                  permaneciendo esencialmente sin cambios.
                </p>
              </div>
              
              <div className="space-y-5 relative">
                <div className="flex items-start group transition-all duration-300 hover:translate-x-1">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-100/60 group-hover:shadow-sm">
                    <svg className="w-5 h-5 text-blue-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="font-medium text-slate-700">29 Street, Melbourne City, Australia.</p>
                    {/* Pequeña decoración muy sutil */}
                    <div className="absolute -bottom-0.5 left-0 w-12 h-px bg-gradient-to-r from-blue-300/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                <div className="flex items-start group transition-all duration-300 hover:translate-x-1">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-100/60 group-hover:shadow-sm">
                    <svg className="w-5 h-5 text-blue-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="font-medium text-slate-700">infonouka@gmail.com</p>
                    <div className="absolute -bottom-0.5 left-0 w-12 h-px bg-gradient-to-r from-blue-300/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                <div className="flex items-start group transition-all duration-300 hover:translate-x-1">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-100/60 group-hover:shadow-sm">
                    <svg className="w-5 h-5 text-blue-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="font-medium text-slate-700">+123-88-956-000</p>
                    <div className="absolute -bottom-0.5 left-0 w-12 h-px bg-gradient-to-r from-blue-300/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                <div className="flex items-start group transition-all duration-300 hover:translate-x-1">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-100/60 group-hover:shadow-sm">
                    <svg className="w-5 h-5 text-blue-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03 3-9s1.343-9 3-9m-9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9" />
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="font-medium text-slate-700">www.radiustheme.com</p>
                    <div className="absolute -bottom-0.5 left-0 w-12 h-px bg-gradient-to-r from-blue-300/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Formulario */}
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        </section>

        {/* Sección del mapa */}
        <section className=" pb-16 relative">
          {/* Pequeños elementos decorativos muy sutiles */}
          <div className="absolute -top-4 left-1/4 w-3 h-3 bg-blue-300/20 rounded-full"></div>
          <div className="absolute -bottom-2 right-1/3 w-4 h-4 border border-slate-300/30 rounded-full"></div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden h-96 shadow-lg shadow-slate-200/30 relative border border-slate-200/40">
            {/* Marco decorativo muy sutil */}
            <div className="absolute inset-1 border border-slate-100/50 rounded-xl pointer-events-none"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509371!2d144.9537353153187!3d-37.81720997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1c8a3b1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1634024308035!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              title="Ubicación de la Empresa"
              className="rounded-2xl"
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
};