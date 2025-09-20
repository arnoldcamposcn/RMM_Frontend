
import { useFetch } from '../../hooks/useFetch';
import type { Magazine } from '../../schema/magazine/magazine';
import { getAllMagazines } from '../../services/magazine/magazine.service';
import MonthlyEditionsTemplate from '../templates/MonthlyEditionsTemplate';
import { cleanRichText } from '../../utils/cleanRichText';

export const EditionContainer = () => {
  const { data: magazines, loading, error } = useFetch<Magazine[]>(getAllMagazines, []);



  if (loading) return <div className="p-4 text-center">⏳ Cargando ediciones...</div>;
  if (error) return <div className="p-4 text-center text-red-500">❌ Error al cargar las ediciones</div>;
  if (!magazines || magazines.length === 0) return <div className="p-4 text-center text-gray-500">📭 No hay ediciones disponibles</div>;

  // Mapear datos del API a MonthlyEditionsTemplate
 

  // Para la sección "Artículos Recientes", usar las primeras 4 ediciones
  const recentArticles = magazines.slice(0, 4).map(magazine => ({
    id: magazine.id,
    image: magazine.imagen,
    month: new Date(magazine.fecha_publicacion).toLocaleDateString('es-ES', { month: 'long' }).toUpperCase(),
    title: magazine.titulo_edicion,
    description: cleanRichText(magazine.contenido),
    editionNumber: magazine.numero_edicion,
  }));

  return (
    <MonthlyEditionsTemplate
      recentArticles={recentArticles}
    />
  );
};
