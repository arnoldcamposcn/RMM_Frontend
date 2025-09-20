// pages/SupplementsPage.tsx
import SupplementsTemplate from '../templates/SupplementsTemplate';
import type { CardData } from '../organisms/CarouselMagazine';

export default function SupplementsPage() {
  // const handleReadMore = () => console.log('Leer suplemento completo');
  const handleViewSupplement = (id: number) => console.log('Ver suplemento:', id);
  const handleCarouselCardClick = (item: CardData) => console.log('Carousel card clicked:', item);

  // Datos de ejemplo para suplementos
  const featuredSupplement = {
    image: "/images/suplemento-semanal.png", 
    title: "Suplemento Especial: Análisis de Mercado Minero 2024",
    description: "Un análisis exhaustivo de las tendencias del mercado minero global, incluyendo proyecciones de precios, nuevas tecnologías emergentes y oportunidades de inversión en el sector de la minería sostenible."
  };

  const weeklySupplements = [
    { 
      id: 1, 
      image: "/images/revista-mm.png", 
      month: "AGOSTO",
      title: "Inversión Minera, MAPE Y Tía María",
      description: "A Single Monitor Manifesto — Many Developers Believe Multiple Monitors Improv...",
      editionNumber: 273
    },
    { 
      id: 2, 
      image: "/images/revista-mm.png", 
      month: "JULIO",
      title: "Inversión Minera, MAPE Y Tía María",
      description: "A Single Monitor Manifesto — Many Developers Believe Multiple Monitors Improv...",
      editionNumber: 272
    },
    { 
      id: 3, 
      image: "/images/revista-mm.png", 
      month: "JULIO",
      title: "Inversión Minera, MAPE Y Tía María",
      description: "A Single Monitor Manifesto — Many Developers Believe Multiple Monitors Improv...",
      editionNumber: 271
    }
  ];

  // Datos para el carrusel de contenido relacionado
  const carouselItems: CardData[] = [
    {
      id: 'supplement-1',
      title: 'Tendencias en Minería 2024',
      description: 'Análisis de las principales tendencias que marcarán el futuro de la industria minera.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Análisis'
    },
    {
      id: 'supplement-2',
      title: 'Inversiones en el Sector Minero',
      description: 'Oportunidades de inversión y proyectos destacados en la industria minera global.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Inversión'
    },
    {
      id: 'supplement-3',
      title: 'Regulaciones Mineras Actuales',
      description: 'Últimas normativas y regulaciones que afectan a la industria minera nacional.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Regulación'
    },
    {
      id: 'supplement-4',
      title: 'Innovación Tecnológica Minera',
      description: 'Nuevas tecnologías que están revolucionando los procesos de extracción minera.',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Tecnología'
    },
    {
      id: 'supplement-5',
      title: 'Mercados Internacionales',
      description: 'Perspectivas de los mercados internacionales y precios de commodities mineros.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Mercados'
    }
  ];

  return (
    <SupplementsTemplate
      featuredSupplement={featuredSupplement}
      weeklySupplements={weeklySupplements}
      carouselItems={carouselItems}
      // onReadMore={handleReadMore}
      onViewSupplement={handleViewSupplement}
      onCarouselCardClick={handleCarouselCardClick}
    />
  );
}
