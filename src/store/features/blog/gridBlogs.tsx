import { useFetch } from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import type { Blog } from '../../../schema/blog/blog';
import EditionCard from '../../../components/molecules/EditionCard';
import { getRecentBlogs } from '../../../services/blog/blog.service';

const gridBlogs: React.FC = () => {
  const { data, loading, error } = useFetch<Blog[]>(getRecentBlogs, []); 
  const navigate = useNavigate();
    
  if (loading) return <div className="p-4 text-center">⏳ Cargando blogs...</div>;
  if (error) return <div className="p-4 text-center text-red-500">❌ Error al cargar blogs</div>;
  if (!data || data.length === 0) return <div className="p-4 text-center text-gray-500">📭 No hay blogs disponibles</div>;

  const blogs = data;

  const handleBlogClick = (id: number) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <div className="flex flex-col gap-4">
       <h2 className="text-2xl font-bold text-gray-800">Blogs Recientes</h2>
      {blogs.map((blog) => (
        <EditionCard
          key={blog.id}
          id={blog.id}
          title={blog.titulo_blog}
          image={blog.imagen_principal}
          items={[]} // Array vacío ya que este EditionCard no usa items
          onViewMore={() => handleBlogClick(blog.id)}
        />
      ))}
    </div>
  );
};

export default gridBlogs;
