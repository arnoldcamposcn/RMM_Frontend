import React, { useState, useEffect } from "react";
import DateDisplay from "../atoms/DateDisplay";
import ShareIcons from "../atoms/ShareIcons";
import { toggleLike, getBlogLikes } from "../../services/blog/blog.service";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Corazón lleno/vacío
import type { Blog } from "../../schema/blog/blog";

interface ContentSectionProps {
  blogId: number; // 🔹 Necesitamos el id del blog
  blogData?: Blog; // 🔹 Datos del blog incluyendo likes
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

  // Cargar información de likes del blog al montar el componente
  useEffect(() => {
    const fetchBlogLikes = async () => {
      try {
        const likesData = await getBlogLikes(blogId);
        setIsLiked(likesData.user_liked);
        setLikesCount(likesData.total_likes);
      } catch (error) {
        console.error("Error al cargar likes del blog:", error);
        // Fallback a datos del blog si están disponibles
        if (blogData) {
          setIsLiked(blogData.is_liked || false);
          setLikesCount(blogData.likes_count || 0);
        }
      }
    };

    fetchBlogLikes();
  }, [blogId, blogData]);

  const handleLike = async () => {
    if (isLoading) return; // Evitar múltiples clicks
    
    setIsLoading(true);
    try {
      await toggleLike(blogId); // Llama al servicio
      // Actualizar estado local inmediatamente para feedback visual
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error("Error al hacer toggle del like:", error);
      // Revertir cambios en caso de error
      setIsLiked(isLiked);
      setLikesCount(likesCount);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
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
    </div>
  );
};

export default ContentSection;
