// components/templates/HomeTemplate.tsx
import EditionsSection from '../organisms/EditionsSection';
// import CarouselMagazine, { type CardData } from '../organisms/CarouselMagazine';
import ArticleCarouselContainer from '../../store/features/articles/BlogCarouselContainer';
import BlogCarouselContainer from '../../store/features/blog/BlogCarouselContainer';

interface WeeklyEditionData {
  id: number;
  image: string;
  title: string;
  editionNumber: number;
}

interface HomeTemplateProps {
  weeklyEditions: WeeklyEditionData[];
  onViewEdition: (id: number) => void;
}

/**
 * Template específico para la página Home
 * El Header y el contenedor principal con padding/width se manejan automáticamente por MainLayout
 */
export default function HomeTemplate({
  weeklyEditions,
  onViewEdition
}: HomeTemplateProps) {
  return (
    <>
      {/* Sección 1: Ediciones */}
      <EditionsSection
        weeklyEditions={weeklyEditions}
        onViewEdition={onViewEdition}
      />

      {/* Sección 2: Artículos Recientes (Dinámico) */}
      <ArticleCarouselContainer />

      {/* Sección 3: Blogs Destacados (Dinámico) */}
      <BlogCarouselContainer />
    </>
  );
}
