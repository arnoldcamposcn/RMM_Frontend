import React, { useState } from "react";
import { createArticleComment } from "../../../services/articles/article-comments.service";
import type { ArticleCreateComment, CommentFormProps } from "../types";
import { TextArea, Button } from "../atoms";

export const ArticleCommentForm: React.FC<CommentFormProps> = ({ 
  blogId, // Reutilizamos blogId como articleId
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
      const newComment: ArticleCreateComment = {
        articulo: blogId, // blogId se usa como articleId
        contenido,
        parent: parentId,
      };

      await createArticleComment(newComment);

      setContenido(""); // limpiar campo
      if (onCommentAdded) onCommentAdded(); // refrescar lista
    } catch (error) {
      console.error("Error al crear comentario del artículo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm p-6 mt-6">
      {/* Header del formulario */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <svg className="w-5 h-5 text-[#53C1A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="title-magazine text-lg font-bold text-[#132F56]">
            Deja tu comentario
          </h3>
        </div>
        <div className="w-20 h-0.5 bg-gradient-to-r from-[#4AB39A] to-[#3FA08A] rounded-full"></div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <TextArea
            value={contenido}
            onChange={setContenido}
            placeholder={placeholder}
            disabled={loading}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#53C1A9]/20 focus:border-[#53C1A9] transition-all duration-300 resize-none paragraph-magazine text-gray-700 placeholder-gray-400"
          />
          {/* Contador de caracteres */}
          <div className="absolute bottom-2 right-3 text-xs text-gray-400">
            {contenido.length}/500
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          {/* Información adicional */}
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Tu comentario será moderado</span>
          </div>

          {/* Botón de envío */}
          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            variant="primary"
            size="medium"
            className="bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] hover:from-[#4AB39A] hover:to-[#3FA08A] text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <span>Comentar</span>
                <svg className="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
