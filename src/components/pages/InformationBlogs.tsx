import { useParams } from 'react-router-dom';
import InformationSupplementsTemplate from '../templates/InformationSupplementsTemplate';
import { useFetch } from '../../hooks/useFetch';
import { getBlog } from '../../services/blog/blog.service';
import type { Blog } from '../../schema/blog/blog';
import { cleanRichText } from '../../utils/cleanRichText';


const InformationBlogs = () => {
  const { id } = useParams<{ id: string }>();
  const blogId = Number(id);
  
  const { data: blog, loading, error } = useFetch<Blog>(
    () => getBlog(blogId),
    [blogId] 
  );

  const handleViewEdition = (id: number) => {
    console.log('Ver blog relacionado:', id);
  };

  if (loading) return <div className="p-4 text-center">⏳ Cargando blog...</div>;
  if (error) return <div className="p-4 text-center text-red-500">❌ Error al cargar el blog</div>;
  if (!blog) return <div className="p-4 text-center text-gray-500">📭 Blog no encontrado</div>;

  // Configurar los datos para el template
  const pageData = {
    pageTitle: blog.titulo_blog,
    bannerImage: blog.imagen,
    
    // Información del blog - formato dd/mm/yyyy
    formattedDate: new Date(blog.fecha_publicacion).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    }), // Esto dará "18/09/2025"
    content: [
      cleanRichText(blog.contenido)
    ],
    
    // Blogs relacionados (hardcodeados por ahora, puedes hacer otro fetch)
    weeklyEditions: [
      {
        id: 1,
        image: "https://elgasnoticias.com/wp-content/uploads/2020/01/mineria-y-renovables.jpg",
        title: "Energías limpias en las operaciones mineras",
        editionNumber: 12
      },
      {
        id: 2,
        image: "https://tecnologiaminera.com/imgPosts/1695217400PUR9RQo9.jpg",
        title: "El futuro de las minas inteligentes",
        editionNumber: 11
      },
      {
        id: 3,
        image: "https://tecnologiaminera.com/imgPosts/1709763999EziiU3Qt.jpg",
        title: "cómo la tecnología está transformando el sector minero",
        editionNumber: 10
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

export default InformationBlogs;
