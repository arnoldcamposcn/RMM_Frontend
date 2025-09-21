import { useState, useEffect } from 'react';
import { getForoCategorias } from '../../../services/foro/foro.service';
import type { CategoriaForo } from '../../../schema/foro/foro';

export const useForoCategorias = () => {
  const [categorias, setCategorias] = useState<CategoriaForo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar categorías del foro
  const loadCategorias = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const categoriasData = await getForoCategorias();
      setCategorias(categoriasData);
    } catch (err) {
      setError('Error al cargar las categorías del foro');
      console.error('Error loading foro categorias:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar categorías al montar
  useEffect(() => {
    loadCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
    loadCategorias
  };
};
