import { useFetch } from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../../../schema/article/article';
import { getRecentArticles } from '../../../services/articles/article.service';
import CarouselMagazine, { type CardData } from '../../../components/organisms/CarouselMagazine';
import { cleanRichText } from '../../../utils/cleanRichText';

const ArticleCarouselContainer: React.FC = () => {
  const { data, loading, error } = useFetch<Article[]>(
    () => getRecentArticles(8), // Limitar a 8 artículos
    []);
    
  const navigate = useNavigate();

  if (loading) return <div className="p-4 text-center">⏳ Cargando artículos recientes...</div>;
  if (error) return <div className="p-4 text-center text-red-500">❌ Error al cargar artículos</div>;
  if (!data || data.length === 0) return <div className="p-4 text-center text-gray-500">📭 No hay artículos disponibles</div>;

  // Mapear artículos del API a CardData para el carrusel
  const articleItems: CardData[] = data.map((article) => ({
    id: article.id,
    title: article.titulo_articulo,
    description: cleanRichText(article.contenido),
    image: article.imagen,
  }));

  const handleArticleClick = (item: CardData) => {
    navigate(`/articulos/${item.id}`);
  };

  return (
    <CarouselMagazine
      id="article-carousel"
      title="Articulos Destacados"
      items={articleItems}
      onCardClick={handleArticleClick}
    />
  );
};

export default ArticleCarouselContainer;
