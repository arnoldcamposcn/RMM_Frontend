


import { TeamSection } from '../organisms/TeamSection';
import type { TeamMember } from '../molecules/TeamMemberCard';

export const AboutPage = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "María González",
      position: "Directora Ejecutiva",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      position: "Director Técnico",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 3,
      name: "Ana López",
      position: "Jefa de Investigación",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 4,
      name: "Jorge Martínez",
      position: "Especialista en Minería",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Sección principal con dos columnas */}
        <section className="container mx-auto py-16 px-4 sm:px-6 lg:px-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Columna izquierda - Imágenes intercaladas */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 h-96">
                {/* Primera imagen - arriba izquierda */}
                <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Minería moderna" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Segunda imagen - arriba derecha, más pequeña */}
                <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Equipo de trabajo" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Tercera imagen - abajo, centrada */}
              <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 mt-4 mx-auto w-3/4">
                <img 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Innovación tecnológica" 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Elemento decorativo */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-8 -left-6 w-16 h-16 bg-indigo-100 rounded-full opacity-60"></div>
            </div>

            {/* Columna derecha - Información sobre nosotros */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                  Quiénes Somos
                </h1>
              </div>
              
              <div className="space-y-4 ">
                <p className="paragraph-magazine">
                  Somos una revista especializada dedicada a la industria minera y metalúrgica, 
                  comprometida con brindar información actualizada, análisis profundos y perspectivas 
                  innovadoras sobre el sector.
                </p>
                
                <p className="paragraph-magazine">
                  Nuestro equipo está conformado por profesionales con amplia experiencia en minería, 
                  metalurgia, ingeniería y periodismo especializado. Trabajamos incansablemente para 
                  ofrecer contenido de calidad que inspire, informe y conecte a la comunidad minera.
                </p>
                
                <p className="paragraph-magazine">
                  Con más de una década de experiencia, nos hemos posicionado como una fuente 
                  confiable de información para profesionales, empresas y académicos del sector 
                  minero-metalúrgico en toda la región.
                </p>
              </div>
              
              <div className="pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-azul-codea">10+</div>
                    <div className="tracking-wide paragraph-magazine">Años de experiencia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-azul-codea">500+</div>
                    <div className="tracking-wide paragraph-magazine">Artículos publicados</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TeamSection teamMembers={teamMembers} />
      </div>
    </>
  );
};
