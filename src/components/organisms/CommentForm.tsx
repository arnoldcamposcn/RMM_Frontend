import React, { useState } from "react";
import { createComment } from "../../services/blog/blog.service";
import type { CreateComment } from "../../schema/blog/blog";

interface CommentFormProps {
  blogId: number;
  parentId?: number | null; // ID del comentario padre (null para comentarios principales)
  onCommentAdded?: () => void; // para refrescar comentarios tras enviar
  placeholder?: string; // texto personalizado para el placeholder
}

export const CommentForm: React.FC<CommentFormProps> = ({ 
  blogId, 
  parentId = null, 
  onCommentAdded, 
  placeholder = "Escribe un comentario..." 
}) => {
  const [contenido, setContenido] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contenido.trim()) return;

    setLoading(true);
    try {
      const newComment: CreateComment = {
        blog: blogId,
        contenido,
        parent: parentId, // Usar el ID del comentario padre
      };

      await createComment(newComment);

      setContenido(""); // limpiar campo
      if (onCommentAdded) onCommentAdded(); // refrescar lista
    } catch (error) {
      console.error("Error al crear comentario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
      <textarea
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        placeholder={placeholder}
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Comentar"}
      </button>
    </form>
  );
};
