import { useFetch } from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import type { Blog } from '../../../schema/blog/blog';
import { getRecentBlogs } from '../../../services/blog/blog.service';
import CarouselMagazine, { type CardData } from '../../../components/organisms/CarouselMagazine';
import { cleanRichText } from '../../../utils/cleanRichText';

const BlogCarouselContainer: React.FC = () => {
  const { data, loading, error } = useFetch<Blog[]>(
    () => getRecentBlogs(8),
[]);

  const navigate = useNavigate();

  if (loading) return <div className="p-4 text-center">⏳ Cargando blogs recientes...</div>;
  if (error) return <div className="p-4 text-center text-red-500">❌ Error al cargar blogs</div>;
  if (!data || data.length === 0) return <div className="p-4 text-center text-gray-500">📭 No hay blogs disponibles</div>;


  const blogItems: CardData[] = data.map((blog) => ({
    id: blog.id,
    title: blog.titulo_blog,
    description: cleanRichText(blog.contenido),
    image: blog.imagen,
  }));

  const handleBlogClick = (item: CardData) => {
    navigate(`/blogs/${item.id}`);
  };

  return (
    <CarouselMagazine
      id="blog-carousel"
      title="Blogs Recientes"
      items={blogItems}
      onCardClick={handleBlogClick}
    />
  );
};

export default BlogCarouselContainer;
