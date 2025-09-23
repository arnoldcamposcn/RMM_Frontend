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
      <div className="min-h-screen bg-white">
        {/* Header limpio */}
        <div className="bg-white">
          <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="title-magazine text-4xl sm:text-5xl font-bold text-[#132F56] mb-4">
                Contáctanos
              </h1>
              <p className="paragraph-magazine text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Estamos aquí para ayudarte. Envíanos un mensaje y nos pondremos en contacto contigo pronto.
              </p>
            </div>
          </div>
        </div>

        <section className="container mx-auto pb-6 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Columna izquierda - Información de contacto */}
            <div className="p-8">
              <h2 className="title-magazine text-2xl font-bold text-[#132F56] mb-6">
                Información de Contacto
              </h2>
              
              <div className="mb-8">
                <p className="paragraph-magazine text-gray-700 leading-relaxed">
                  Estamos comprometidos con brindar el mejor servicio a nuestros lectores y socios. 
                  No dudes en contactarnos para cualquier consulta, sugerencia o colaboración.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="paragraph-magazine font-semibold text-gray-700">Dirección</p>
                    <p className="paragraph-magazine text-gray-600">Av. Principal 123, Ciudad, País</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="paragraph-magazine font-semibold text-gray-700">Email</p>
                    <p className="paragraph-magazine text-gray-600">contacto@revistametamining.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="paragraph-magazine font-semibold text-gray-700">Teléfono</p>
                    <p className="paragraph-magazine text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03 3-9s1.343-9 3-9m-9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9" />
                    </svg>
                  </div>
                  <div>
                    <p className="paragraph-magazine font-semibold text-gray-700">Sitio Web</p>
                    <p className="paragraph-magazine text-gray-600">www.revistametamining.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Formulario */}
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        </section>

        {/* Sección del mapa */}
        <section className="container mx-auto pb-16 px-4 sm:px-6 lg:px-8 pt-8">
          <div className="mb-8">
            <h3 className="title-magazine text-2xl font-bold text-[#132F56] mb-4 text-center">
              Nuestra Ubicación
            </h3>
            <p className="paragraph-magazine text-gray-600 text-center max-w-2xl mx-auto">
              Visítanos en nuestras oficinas principales. Estamos ubicados en el corazón de la ciudad.
            </p>
          </div>
          
          <div className="overflow-hidden h-96 border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509371!2d144.9537353153187!3d-37.81720997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1c8a3b1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1634024308035!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              title="Ubicación de la Empresa"
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
};