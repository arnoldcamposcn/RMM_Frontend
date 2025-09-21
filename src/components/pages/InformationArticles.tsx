import { useParams } from 'react-router-dom';
import InformationSupplementsTemplate from '../templates/InformationSupplementsTemplate';
import { useFetch } from '../../hooks/useFetch';
import { getArticle } from '../../services/articles/article.service';
import type { Article } from '../../schema/article/article';
import { cleanRichText } from '../../utils/cleanRichText';

const InformationArticles = () => {
  const { id } = useParams<{ id: string }>();
  const articleId = Number(id);

  const { data: article, loading, error } = useFetch<Article>(
    () => getArticle(articleId),
    [articleId] // ✅ Solo se ejecuta cuando cambia el articleId
  );



  if (loading) return <div className="p-4 text-center">⏳ Cargando artículo...</div>;
  if (error) return <div className="p-4 text-center text-red-500">❌ Error al cargar el artículo</div>;
  if (!article) return <div className="p-4 text-center text-gray-500">📭 Artículo no encontrado</div>;

  // Configurar los datos para el template
  const pageData = {
    pageTitle: article.titulo_articulo,
    bannerImage: article.banner,

    // Información del artículo - formato dd/mm/yyyy
    formattedDate: new Date(article.fecha_publicacion).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }), // Esto dará "18/09/2025"
    content: [
      cleanRichText(article.contenido)
    ],

    // Artículos relacionados (hardcodeados por ahora, puedes hacer otro fetch)

  };

  return (
    <InformationSupplementsTemplate
      pageTitle={pageData.pageTitle}
      bannerImage={pageData.bannerImage}
      formattedDate={pageData.formattedDate}
      content={pageData.content}
      sharePlatforms={['facebook', 'linkedin', 'instagram']}
      id={articleId}
      contentType="article"
    />
  );
};

export default InformationArticles;
