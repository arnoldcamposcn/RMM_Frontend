// components/templates/SupplementsTemplate.tsx
import FeaturedEdition from '../molecules/FeaturedEdition';
import PastEditionCard from '../molecules/PastEditionCard';
import Title from '../atoms/Title';
import EditionCard from '../molecules/EditionCard';
import CarouselMagazine, { type CardData } from '../organisms/CarouselMagazine';

interface FeaturedEditionData {
  image: string;
  title: string;
  description: string;
}

interface WeeklySupplementData {
  id: number;
  image: string;
  title: string;
  description: string;
  month: string;
  editionNumber: number;
}

interface SupplementsTemplateProps {
  featuredSupplement: FeaturedEditionData;
  weeklySupplements: WeeklySupplementData[];
  carouselItems?: CardData[];
  // onReadMore: () => void;
  onViewSupplement: (id: number) => void;
  onCarouselCardClick?: (item: CardData) => void;
}

/**
 * Template específico para la página de Suplementos Semanales
 * Usa PastEditionCard en la columna derecha (diferente de Home)
 */
export default function SupplementsTemplate({
  featuredSupplement,
  weeklySupplements,
  carouselItems = [],
  // onReadMore,
  onViewSupplement,
  onCarouselCardClick
}: SupplementsTemplateProps) {
  return (
    <section className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna 1: Suplemento destacado (2/3 del ancho en desktop) */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Title className="text-xl">Suplemento de la semana</Title>
            </div>
            <FeaturedEdition
              image={featuredSupplement.image}
              title={featuredSupplement.title}
              description={featuredSupplement.description}
              // onReadMore={onReadMore} // eslint-disable-line @typescript-eslint/no-unused-vars
            />


            <div className="flex flex-col space-y-4 pt-8 py-12">
              {weeklySupplements.map((supplement) => (
                <PastEditionCard
                  key={supplement.id}
                  image={supplement.image}
                  month={supplement.month}
                  title={supplement.title}
                  description={supplement.description}
                  editionNumber={supplement.editionNumber}
                  onReadMore={() => onViewSupplement(supplement.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Columna 2: Suplementos semanales con PastEditionCard */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Title className="text-xl">Ediciones del mes</Title>
            </div>
            
            {/* Contenedor flex vertical para las cards */}
            <div className="flex flex-col space-y-4">
              {weeklySupplements.map((edition) => (
                 <EditionCard
                 key={edition.id}
                 image={edition.image}
                 title={edition.title}
                 editionNumber={edition.editionNumber}
                 onViewMore={() => onViewSupplement(edition.id)}
               />
              ))}
            </div>
          </div>
        </div>

        {/* Sección del carrusel - abajo de todo el contenido */}
        {carouselItems.length > 0 && (
          <div className="mt-2">
            <CarouselMagazine
              id="supplements-carousel"
              title="Contenido Relacionado"
              items={carouselItems}
              onCardClick={onCarouselCardClick}
              className="bg-slate-50/30"
            />
          </div>
        )}
    </section>
  );
}
