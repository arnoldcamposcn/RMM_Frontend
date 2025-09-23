import React, { useState, useEffect } from "react";
import DateDisplay from "../atoms/DateDisplay";
import ShareIcons from "../atoms/ShareIcons";
import { toggleLike, getBlogLikes } from "../../services/blog/blog.service";
import { toggleArticleLike, getArticleLikes } from "../../services/articles/article-likes.service";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Corazón lleno/vacío
import type { Blog } from "../../schema/blog/blog";

interface ContentSectionProps {
  blogId: number; // 🔹 ID del blog o artículo
  blogData?: Blog; // 🔹 Datos del blog incluyendo likes
  contentType?: 'blog' | 'article'; // 🔹 Tipo de contenido
  formattedDate?: string;
  month?: string;
  year?: number;
  content: string[];
  sharePlatforms?: ("facebook" | "linkedin" | "instagram")[];
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  blogId,
  blogData,
  contentType = 'blog', // Por defecto es blog para mantener compatibilidad
  formattedDate,
  month,
  year,
  content,
  sharePlatforms = ["facebook", "linkedin", "instagram"],
  className = "",
}) => {
  const [isLiked, setIsLiked] = useState(false); // 🔹 Estado local
  const [likesCount, setLikesCount] = useState(0); // 🔹 Contador de likes
  const [isLoading, setIsLoading] = useState(false); // 🔹 Estado de carga

  // Cargar información de likes según el tipo de contenido
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        if (contentType === 'article') {
          const likesData = await getArticleLikes(blogId);
          setIsLiked(likesData.user_liked);
          setLikesCount(likesData.total_likes);
        } else {
          // Por defecto es blog
          const likesData = await getBlogLikes(blogId);
          setIsLiked(likesData.user_liked);
          setLikesCount(likesData.total_likes);
        }
      } catch (error) {
        console.error(`Error al cargar likes del ${contentType}:`, error);
        // Fallback a datos del blog si están disponibles (solo para blogs)
        if (blogData && contentType === 'blog') {
          setIsLiked(blogData.is_liked || false);
          setLikesCount(blogData.likes_count || 0);
        }
      }
    };

    fetchLikes();
  }, [blogId, blogData, contentType]);

  const handleLike = async () => {
    if (isLoading) return; // Evitar múltiples clicks
    
    setIsLoading(true);
    try {
      if (contentType === 'article') {
        await toggleArticleLike(blogId); // Llama al servicio de artículos
      } else {
        await toggleLike(blogId); // Llama al servicio de blogs
      }
      // Actualizar estado local inmediatamente para feedback visual
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error(`Error al hacer toggle del like del ${contentType}:`, error);
      // Revertir cambios en caso de error
      setIsLiked(isLiked);
      setLikesCount(likesCount);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>

       {/* Contenido */}
       <div className="space-y-4">
        {content.map((paragraph, index) => (
          <p
            key={index}
            className="paragraph-magazine text-gray-700 leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>
      {/* Fecha + botones */}
      <div className="flex justify-between items-center">
        <DateDisplay formattedDate={formattedDate} month={month} year={year} />

        <div className="flex items-center space-x-4">
          <ShareIcons platforms={sharePlatforms} />

          {/* Botón Like */}
          <button
            onClick={handleLike} 
            disabled={isLoading}
            className={`flex items-center space-x-2 hover:scale-110 transition ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
            <span>{isLiked ? "Te gusta" : "Me gusta"}</span>
            {likesCount > 0 && (
              <span className="ml-1 font-medium text-sm">({likesCount})</span>
            )}
          </button>
        </div>
      </div>

     
    </div>
  );
};

export default ContentSection;
