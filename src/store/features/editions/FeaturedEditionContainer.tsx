import FeaturedEdition from '../../../components/molecules/FeaturedEdition';
import { useFetch } from '../../../hooks/useFetch';
import { getMagazines } from '../../../services/magazine/magazine.service';
import type { Magazine } from '../../../schema/magazine/magazine';

const FeaturedEditionContainer: React.FC = () => {
  const { data, loading, error } = useFetch<Magazine>(getMagazines, []); // ✅ Sin dependencias

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar</p>;
  if (!data) return <p>No hay datos</p>;

  const latest = data;

  return (
    <FeaturedEdition
      image={latest.imagen}
      title={latest.titulo_edicion}
      description={latest.contenido}
      metadata={{
        date: latest.fecha_publicacion,
        edition: latest.numero_edicion,
        url: latest.url_impresa
      }}
    />
  );
};

export default FeaturedEditionContainer;
