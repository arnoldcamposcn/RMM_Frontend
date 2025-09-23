import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export interface CardData {
  id: string | number;
  title: string;
  description: string;
  image: string;
}

interface CarouselMagazineProps {
  id?: string;
  title?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  slidesPerView?: number;
  className?: string;
  items: CardData[];
  onCardClick?: (item: CardData) => void;
}

export default function CarouselMagazine({
  title,
  items,
  autoplay = true,
  autoplayDelay = 6000,
  slidesPerView = 4,
  onCardClick,
  className = "",
  id = "carousel"
}: CarouselMagazineProps) {
  // Generar selectores únicos para este carrusel
  const nextButtonSelector = `.swiper-button-next-${id}`;
  const prevButtonSelector = `.swiper-button-prev-${id}`;

  // const getCategoryColor = (category?: string) => {
  //   const colors: { [key: string]: string } = {
  //     'Tecnología': 'bg-blue-500',
  //     'Automatización': 'bg-purple-500',
  //     'IA': 'bg-green-500',
  //     'Seguridad': 'bg-red-500',
  //     'Sostenibilidad': 'bg-emerald-500',
  //     'Blockchain': 'bg-orange-500',
  //     'default': 'bg-slate-500'
  //   };
  //   return colors[category || 'default'] || colors.default;
  // };

  const handleCardClick = (item: CardData) => {
    if (onCardClick) {
      onCardClick(item);
    }
  };

  return (
    <div className={`w-full py-4 ${className}`}>
      <div className="container mx-auto">
        {/* Header de la sección */}
        {title && (
          <div className="text-start mb-8">
            {title && (
              <div className="relative">
                <h2 className="title-magazine text-2xl sm:text-2xl font-bold mb-2 text-[#132F56]">
                  {title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] rounded-full"></div>
              </div>
            )}
          </div>
        )}

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={slidesPerView}
            spaceBetween={24}
            navigation={{
              nextEl: nextButtonSelector,
              prevEl: prevButtonSelector,
            }}
            autoplay={autoplay ? {
              delay: autoplayDelay,
              disableOnInteraction: false,
            } : false}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="!pb-16"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div 
                  className="group cursor-pointer h-full"
                  onClick={() => handleCardClick(item)}
                >
                  <div className="carousel-card bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 hover:border-[#53C1A9] h-full flex flex-col transition-all duration-300 group-hover:-translate-y-1">
                    {/* Imagen con overlay mejorado */}
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-xl">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Overlay profesional */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {/* Indicador de hover */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <svg className="w-4 h-4 text-[#53C1A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Contenido de la card */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <h3 className="carousel-card-title title-magazine text-lg sm:text-xl font-semibold mb-3 leading-tight text-[#132F56] group-hover:text-[#53C1A9] transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="carousel-card-description paragraph-magazine text-sm sm:text-base leading-relaxed line-clamp-3 flex-1 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {item.description}
                      </p>
                      
                      {/* Línea decorativa con efecto */}
                      <div className="mt-4 pt-4 border-t border-gray-100 group-hover:border-[#53C1A9]/30 transition-colors duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#53C1A9] font-semibold group-hover:text-[#4AB39A] transition-colors duration-300">
                            Leer más
                          </span>
                          <div className="w-8 h-px bg-gradient-to-r from-[#53C1A9] to-transparent group-hover:w-12 transition-all duration-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botones de navegación personalizados */}
          <div className={`swiper-button-prev-${id} absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-[#132F56] hover:text-white hover:bg-[#53C1A9] hover:border-[#53C1A9] hover:shadow-xl transition-all duration-300 cursor-pointer group`}>
            <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>

          <div className={`swiper-button-next-${id} absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-[#132F56] hover:text-white hover:bg-[#53C1A9] hover:border-[#53C1A9] hover:shadow-xl transition-all duration-300 cursor-pointer group`}>
            <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
}