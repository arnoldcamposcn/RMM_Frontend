import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import type { Article } from '../../../schema/article/article';
import { ArticlesRelated } from '../../../services/blog/blog.service';
import EditionCard from '../../../components/molecules/EditionCard';

const GridArticles: React.FC<{ id: number }> = ({ id }) => {
  const { data, loading, error } = useFetch<Article[]>(() => ArticlesRelated(id), [id]);
  const navigate = useNavigate();

  if (loading) return <p className="p-4 text-center">⏳ Cargando artículos...</p>;
  if (error) return <p className="p-4 text-center text-red-500">❌ Error al cargar artículos</p>;
  if (!data?.length) return <p className="p-4 text-center text-gray-500">📭 No hay artículos disponibles</p>;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Artículos relacionados</h2>
      {data.map((article) => (
        <EditionCard
          key={article.id}
          id={article.id}
          title={article.titulo_articulo}
          contenido={article.contenido}
          image={article.imagen_principal}
          onViewMore={() => navigate(`/articulos/${article.id}`)}
          items={[]}
        />
      ))}
    </section>
  );
};

export default GridArticles;
