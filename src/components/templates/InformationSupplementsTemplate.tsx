import React from 'react';
import BannerSection from '../molecules/BannerSection';
import ContentSection from '../molecules/ContentSection';
import RelatedArticles from '../../store/features/blog/RelatedArticles';
import GridBlogs from '../../store/features/blog/gridBlogs';
import { CommentsTemplate, ArticleCommentsTemplate } from '../comments';
import { useFetch } from '../../hooks/useFetch';
import { getBlog } from '../../services/blog/blog.service';
import type { Blog } from '../../schema/blog/blog';

interface InformationSupplementsTemplateProps {
  pageTitle: string;
  bannerImage: string;
  formattedDate?: string; 
  month?: string;         
  year?: number;          
  content: string[];
  sharePlatforms?: ('facebook' | 'linkedin' | 'instagram')[];
  id: number;             // Para artículos relacionados
  contentType: 'blog' | 'article'; // Tipo de contenido para mostrar el componente correcto
}

/**
 * Template para página de Información de Suplementos
 * Estructura: Banner superior + 2 columnas (contenido + complementos)
 * 
 * Renderiza condicionalmente el sistema de comentarios según el tipo de contenido:
 * - Blogs: CommentsTemplate
 * - Artículos: ArticleCommentsTemplate
 */
const InformationSupplementsTemplate: React.FC<InformationSupplementsTemplateProps> = ({
  pageTitle,
  bannerImage,
  formattedDate,
  month,
  year,
  content,
  sharePlatforms = ['facebook', 'linkedin', 'instagram'],
  id,
  contentType,
}) => {
  // Obtener datos del blog para likes (solo si es un blog)
  const { data: blogData } = useFetch<Blog>(
    () => contentType === 'blog' ? getBlog(id) : Promise.resolve({} as Blog),
    [id, contentType]
  );
  return (
    <div>
      {/* Sección superior: Título y Banner */}
      <BannerSection 
        title={pageTitle}
        bannerImage={bannerImage}
      />
      
      {/* Sección principal: 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 pb-20">
        
        {/* Columna 1: Fecha, compartir y contenido */}
        <div className="lg:col-span-2">
          <ContentSection
            blogId={id}
            blogData={blogData || undefined}
            contentType={contentType}
            formattedDate={formattedDate}
            month={month}
            year={year}
            content={content}
            sharePlatforms={sharePlatforms}
          />
          {/* Sistema de comentarios condicional según el tipo de contenido */}
          {contentType === 'blog' && (
            <CommentsTemplate blogId={id} />
          )}
          {contentType === 'article' && (
            <ArticleCommentsTemplate articleId={id} />
          )}
          
        </div>
        
        {/* Columna 2: Relacionados */}
        <aside className="lg:col-span-1 flex flex-col space-y-8">
          {contentType === 'blog' && <RelatedArticles id={id} />}
          {contentType === 'article' && <GridBlogs />}
        </aside>
        
      </div>
    </div>
  );
};

export default InformationSupplementsTemplate;
