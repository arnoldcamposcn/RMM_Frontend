import React, { useState } from "react";
import { createComment } from "../../../services/blog/blog.service";
import type { CreateComment, CommentFormProps } from "../types";
import { TextArea, Button } from "../atoms";

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
        parent: parentId,
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
      <TextArea
        value={contenido}
        onChange={setContenido}
        placeholder={placeholder}
        disabled={loading}
        rows={3}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button
        type="submit"
        disabled={loading}
        loading={loading}
        variant="primary"
        size="medium"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Enviando..." : "Comentar"}
      </Button>
    </form>
  );
};
