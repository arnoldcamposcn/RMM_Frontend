import { useFetch } from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import type { Blog } from '../../../schema/blog/blog';
import { getBlogs } from '../../../services/blog/blog.service';
import CardsGridTemplate from '../../../components/templates/CardsGridTemplate';
import { cleanRichText } from '../../../utils/cleanRichText';
import { type CardData } from '../../../components/templates/CardsGridTemplate';

const FeaturedBlogContainer: React.FC = () => {
  const { data, loading, error } = useFetch<Blog[]>(getBlogs, []);

  const navigate = useNavigate();

  if (loading) return <div className="p-4 text-center">⏳ Cargando blogs...</div>;
  if (error) return <div className="p-4 text-center text-red-500">❌ Error al cargar blogs</div>;
  if (!data || data.length === 0) return <div className="p-4 text-center text-gray-500">📭 No hay blogs disponibles</div>;

  const blogs: CardData[] = data.map((blog) => ({
    id: blog.id,
    title: blog.titulo_blog,
    description: cleanRichText(blog.contenido),
    image: blog.imagen,
  }));

  const handleBlogClick = (id: number) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <CardsGridTemplate
      cards={blogs}
      onCardClick={handleBlogClick}
    />
  );
};

export default FeaturedBlogContainer;
