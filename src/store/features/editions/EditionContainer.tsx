import { useFetch } from '../../../hooks/useFetch';
import type { Magazine } from '../../../schema/magazine/magazine';
import { getAllMagazines } from '../../../services/magazine/magazine.service';
import MonthlyEditionCard from '../../../components/molecules/MonthlyEditionCard';

const EditionContainer: React.FC = () => {
  const { data, loading, error } = useFetch<Magazine[]>(getAllMagazines, []); // ✅ Sin dependencias

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar</p>;
  if (!data) return <p>No hay datos</p>;

  const getMagazine = data[0];

  return (
    <MonthlyEditionCard
      image={getMagazine.imagen}
      month={new Date(getMagazine.fecha_publicacion).toLocaleDateString('es-ES', { month: 'long' })}
      // numero_edicion={getMagazine.numero_edicion}
      title={getMagazine.titulo_edicion}
      year={new Date(getMagazine.fecha_publicacion).getFullYear()}
        metadata={{
          url: getMagazine.url_impresa
      }}
    />
  );
};

export default EditionContainer;
