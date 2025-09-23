// components/templates/HomeTemplate.tsx
import EditionsSection from '../organisms/EditionsSection';
// import CarouselMagazine, { type CardData } from '../organisms/CarouselMagazine';
import ArticleCarouselContainer from '../../store/features/articles/BlogCarouselContainer';
import { MessagesForo } from '../organisms/MessagesForo';
// import BlogCarouselContainer from '../../store/features/blog/BlogCarouselContainer';


/**
 * Template específico para la página Home
 * El Header y el contenedor principal con padding/width se manejan automáticamente por MainLayout
 */
export default function HomeTemplate() {
  return (
    <>
      {/* Sección 1: Ediciones */}
      <EditionsSection
      />


      {/* Sección 3: Blogs Destacados (Dinámico) */}
      {/* <BlogCarouselContainer /> */}

      {/* Sección 2: Artículos Recientes (Dinámico) */}
      <ArticleCarouselContainer />
      <MessagesForo />



    </>
  );
}
