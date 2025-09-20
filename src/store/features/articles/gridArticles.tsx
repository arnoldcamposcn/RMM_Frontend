import { useFetch } from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../../../schema/article/article';
import { getArticles } from '../../../services/articles/article.service';
import EditionCard from '../../../components/molecules/EditionCard';

const gridArticles: React.FC = () => {
  const { data, loading, error } = useFetch<Article[]>(getArticles, []); // ✅ Sin dependencias
  const navigate = useNavigate();

  if (loading) return <div className="p-4 text-center">⏳ Cargando artículos...</div>;
  if (error) return <div className="p-4 text-center text-red-500">❌ Error al cargar artículos</div>;
  if (!data || data.length === 0) return <div className="p-4 text-center text-gray-500">📭 No hay artículos disponibles</div>;

  const articles = data;

  const handleArticleClick = (id: number) => {
    navigate(`/articulos/${id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {articles.map((article) => (
        <EditionCard
          key={article.id}
          id={article.id}
          title={article.titulo_articulo}
          image={article.imagen}
          items={[]} // Array vacío ya que este EditionCard no usa items
          onViewMore={() => handleArticleClick(article.id)}
        />
      ))}
    </div>
  );
};

export default gridArticles;
