import React from 'react';
import type { CreateMagazine } from '../../schema/magazine/magazine';

// Interfaz extendida para incluir el ID (necesario para la UI)
interface MagazineWithId extends Omit<CreateMagazine, 'imagen'> {
  id: number;
  imagen: string; // URL de la imagen desde el servicio
}

interface RevistasTableProps {
  revistas: MagazineWithId[];
  onEdit: (revista: MagazineWithId) => void;
  onDelete: (revista: MagazineWithId) => void;
}


const RevistasTable: React.FC<RevistasTableProps> = ({ revistas, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header de la tabla */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Ediciones de Revistas</h3>
        <p className="text-sm text-gray-600 mt-1">Gestiona las ediciones de Meta Mining</p>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nº Edición
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título de la edición
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de publicación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {revistas
              .sort((a, b) => a.id - b.id) // Ordenar por ID ascendente
              .map((revista) => (
              <tr key={revista.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {revista.id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Edición {revista.numero_edicion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{revista.titulo_edicion}</div>
                  {revista.contenido && (
                    <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {revista.contenido.length > 100 
                        ? `${revista.contenido.substring(0, 100)}...` 
                        : revista.contenido
                      }
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(revista.fecha_publicacion).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    {/* Botón Editar */}
                    <button
                      onClick={() => onEdit(revista)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      title="Editar revista"
                    >
                      <span className="mr-1">✏️</span>
                      Editar
                    </button>
                    
                    {/* Botón Eliminar */}
                    <button
                      onClick={() => onDelete(revista)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      title="Eliminar revista"
                    >
                      <span className="mr-1">🗑️</span>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Estado vacío */}
      {revistas.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📘</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay revistas</h3>
          <p className="text-gray-500">Aún no se han creado ediciones de revistas.</p>
        </div>
      )}
    </div>
  );
};

export default RevistasTable;
