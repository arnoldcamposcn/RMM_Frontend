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

  const handleViewEdition = (id: number) => {
    console.log('Ver edición:', id);
    // Implementar navegación a otros artículos relacionados
  };

  if (loading) return <div className="p-4 text-center">⏳ Cargando artículo...</div>;
  if (error) return <div className="p-4 text-center text-red-500">❌ Error al cargar el artículo</div>;
  if (!article) return <div className="p-4 text-center text-gray-500">📭 Artículo no encontrado</div>;

  // Configurar los datos para el template
  const pageData = {
    pageTitle: article.titulo_articulo,
    bannerImage: article.imagen,
    
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
    weeklyEditions: [
      {
        id: 1,
        image: "https://tecnologiaminera.com/imgPosts/1693797118XzzfJp6z.jpg",
        title: "Tecnología e innovación en las minas",
        editionNumber: 12
      },
      {
        id: 2,
        image: "https://tecnologiaminera.com/imgPosts/1734560147Ns1Gj6as.jpg",
        title: "Automatización y minería inteligente",
        editionNumber: 11
      }
     
    ]
  };

  return (
    <InformationSupplementsTemplate
      pageTitle={pageData.pageTitle}
      bannerImage={pageData.bannerImage}
      formattedDate={pageData.formattedDate}
      content={pageData.content}
      sharePlatforms={['facebook', 'linkedin', 'instagram']}
      weeklyEditions={pageData.weeklyEditions}
      onViewEdition={handleViewEdition}
    />
  );
};

export default InformationArticles;
