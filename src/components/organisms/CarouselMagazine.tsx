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
              <h2 className="title-magazine uppercase font-bold mb-4">
                {title}
              </h2>
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
                  <div className="bg-white rounded-md shadow-md h-full flex flex-col">
                    {/* Imagen con overlay */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Contenido de la card */}
                    <div className="p-6 flex-1 flex flex-col">
                    {/* {item.category && (
                        <div className="pb-4">
                          <span className={`${getCategoryColor(item.category)} text-white px-2 py-1 rounded-md text-xs font-medium tracking-wide`}>
                            {item.category}
                          </span>
                        </div>
                      )} */}
                      <h3 className="title-magazine mb-3 leading-tight group-hover:text-azul-codea transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="paragraph-magazine leading-relaxed line-clamp-3 flex-1">
                        {item.description}
                      </p>
                      
                      {/* Línea decorativa */}
                      {/* <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 font-medium">Leer más</span>
                          <div className="w-6 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botones de navegación personalizados */}
          <div className={`swiper-button-prev-${id} absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 cursor-pointer group`}>
            <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>

          <div className={`swiper-button-next-${id} absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 bg-white rounded-full shadow-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 cursor-pointer group`}>
            <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
}