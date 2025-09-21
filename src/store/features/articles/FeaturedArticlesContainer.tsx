import { useFetch } from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../../../schema/article/article';
import { getArticles } from '../../../services/articles/article.service';
import CardsGridTemplate from '../../../components/templates/CardsGridTemplate';
import { cleanRichText } from '../../../utils/cleanRichText';
import { type CardData } from '../../../components/templates/CardsGridTemplate';

const FeaturedArticlesContainer: React.FC = () => {
  const { data, loading, error } = useFetch<Article[]>(getArticles, []); 
  const navigate = useNavigate();

  if (loading) return <div className="p-4 text-center">⏳ Cargando artículos...</div>;
  if (error) return <div className="p-4 text-center text-red-500">❌ Error al cargar artículos</div>;
  if (!data || data.length === 0) return <div className="p-4 text-center text-gray-500">📭 No hay artículos disponibles</div>;

  const articles: CardData[] = data.map((article) => ({
    id: article.id,
    title: article.titulo_articulo,
    description: cleanRichText(article.contenido),
    image: article.imagen_principal,
  }));

  const handleArticleClick = (id: number) => {
    navigate(`/articulos/${id}`);
  };

  return (
    <CardsGridTemplate
      cards={articles}
      onCardClick={handleArticleClick}
    />
  );
};

export default FeaturedArticlesContainer;
