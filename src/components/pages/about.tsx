


export const AboutPage = () => {

  return (
    <>
      <div className="">
        {/* Header limpio */}
        <div className="bg-white">
          <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-2">
            <div className="text-center">
              <h1 className="title-magazine text-4xl sm:text-5xl font-bold text-[#132F56] mb-4">
                Sobre Nosotros
              </h1>
              <p className="paragraph-magazine text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Conoce a nuestro equipo y descubre la pasión que impulsa nuestra revista especializada en minería
              </p>
            </div>
          </div>
        </div>

        {/* Sección principal con dos columnas */}
        <section className="container mx-auto pb-6 px-4 sm:px-6 lg:px-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pb-14">
            
            {/* Columna izquierda - Imágenes limpias */}
            <div className="relative">
              <div className="grid grid-cols-1 gap-4 h-96">
                {/* Primera imagen - arriba izquierda */}
                <div className="relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Minería moderna" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Segunda imagen - arriba derecha, más pequeña */}
               
              </div>
              
              {/* Tercera imagen - abajo, centrada */}
             
            </div>

            {/* Columna derecha - Información sobre nosotros */}
            <div className="p-8">
             
              
              <div className="space-y-6">
                <p className="paragraph-magazine text-gray-700 leading-relaxed">
                  Somos una revista especializada dedicada a la industria minera y metalúrgica, 
                  comprometida con brindar información actualizada, análisis profundos y perspectivas 
                  innovadoras sobre el sector.
                </p>
                
                <p className="paragraph-magazine text-gray-700 leading-relaxed">
                  Nuestro equipo está conformado por profesionales con amplia experiencia en minería, 
                  metalurgia, ingeniería y periodismo especializado. Trabajamos incansablemente para 
                  ofrecer contenido de calidad que inspire, informe y conecte a la comunidad minera.
                </p>
                
                <p className="paragraph-magazine text-gray-700 leading-relaxed">
                  Con más de una década de experiencia, nos hemos posicionado como una fuente 
                  confiable de información para profesionales, empresas y académicos del sector 
                  minero-metalúrgico en toda la región.
                </p>
              </div>
              
              <div className="pt-8 border-t border-gray-100">
              
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#132F56] mb-2">10+</div>
                    <div className="paragraph-magazine text-gray-600 font-semibold">Años de experiencia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#132F56] mb-2">500+</div>
                    <div className="paragraph-magazine text-gray-600 font-semibold">Artículos publicados</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <TeamSection teamMembers={teamMembers} /> */}
      </div>
    </>
  );
};
