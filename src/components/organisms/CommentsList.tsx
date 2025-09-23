// import { useState, useEffect } from "react";
// import { useFetch } from "../../hooks/useFetch";
// import { getComment, getCommentsByBlogId, patchComment, deleteComment, toggleLike, getBlogLikes } from "../../services/blog/blog.service";
// import { getProfile } from "../../store/features/profile/profile.service";
// import { CommentForm } from "./CommentForm";
// import type { PostComment } from "../../schema/blog/blog";
// import type { Profile } from "../../store/features/profile/profileSchema";
// import { FaHeart, FaRegHeart } from "react-icons/fa";

// interface SingleCommentProps {
//   commentId: number;
// }

// export const SingleComment: React.FC<SingleCommentProps> = ({ commentId }) => {
//   const { data, loading, error } = useFetch<PostComment>(() => getComment(commentId), [commentId]);

//   if (loading) return <div>⏳ Cargando comentario...</div>;
//   if (error) return <div className="text-red-500">❌ Error al cargar el comentario</div>;
//   if (!data) return <div>📭 No se encontró el comentario</div>;

//   return (
//     <div className="border p-3 rounded-lg">
//       <p className="text-sm text-gray-600">
//         <span className="font-bold">{data.autor.usuario_unico}</span> •{" "}
//         {new Date(data.creado_en).toLocaleString()}
//       </p>
//       <p>{data.contenido}</p>
//     </div>
//   );
// };

// interface BlogCommentsListProps {
//   blogId: number;
// }

// export const BlogCommentsList: React.FC<BlogCommentsListProps> = ({ blogId }) => {
//   const { data: comments, loading, error, refetch } = useFetch<PostComment[]>(
//     () => getCommentsByBlogId(blogId),
//     [blogId]
//   );

//   // Obtener información del usuario actual
//   const { data: currentUser } = useFetch<Profile>(getProfile, []);

//   // Estados para edición
//   const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
//   const [editContent, setEditContent] = useState<string>("");
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [isDeleting, setIsDeleting] = useState<number | null>(null);
  
//   // Estados para respuestas
//   const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(null);
//   const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  
//   // Estados para paginación de comentarios
//   const [visibleCommentsCount, setVisibleCommentsCount] = useState(3);
  
//   // Estados para like del blog
//   const [isBlogLiked, setIsBlogLiked] = useState(false);
//   const [likesCount, setLikesCount] = useState(0);
//   const [isLikingBlog, setIsLikingBlog] = useState(false);

//   // Cargar información de likes del blog al montar el componente
//   useEffect(() => {
//     const fetchBlogLikes = async () => {
//       try {
//         const likesData = await getBlogLikes(blogId);
//         setIsBlogLiked(likesData.user_liked);
//         setLikesCount(likesData.total_likes);
//       } catch (error) {
//         console.error("Error al cargar likes del blog:", error);
//       }
//     };

//     fetchBlogLikes();
//   }, [blogId]);

//   // Función para verificar si el usuario actual es el autor del comentario
//   const isCurrentUserAuthor = (comment: PostComment): boolean => {
//     if (!currentUser) return false;
//     return currentUser.usuario_unico === comment.autor.usuario_unico;
//   };

//   // Función para manejar el like del blog
//   const handleToggleLike = async () => {
//     if (isLikingBlog) return; // Evitar múltiples clicks
    
//     setIsLikingBlog(true);
//     try {
//       await toggleLike(blogId);
//       // Actualizar estado local inmediatamente para feedback visual
//       setIsBlogLiked(!isBlogLiked);
//       setLikesCount(isBlogLiked ? likesCount - 1 : likesCount + 1);
//     } catch (error) {
//       console.error("Error al hacer toggle del like:", error);
//       // Revertir cambios en caso de error
//       setIsBlogLiked(isBlogLiked);
//       setLikesCount(likesCount);
//     } finally {
//       setIsLikingBlog(false);
//     }
//   };

//   // Función para iniciar edición
//   const handleStartEdit = (comment: PostComment) => {
//     setEditingCommentId(comment.id);
//     setEditContent(comment.contenido);
//   };

//   // Función para cancelar edición
//   const handleCancelEdit = () => {
//     setEditingCommentId(null);
//     setEditContent("");
//   };

//   // Función para guardar edición
//   const handleSaveEdit = async (commentId: number) => {
//     try {
//       setIsUpdating(true);
//       await patchComment(commentId, { 
//         id: commentId, 
//         contenido: editContent,
//         creado_en: new Date().toISOString(),
//         autor: { id: 0, email: "", usuario_unico: "" }
//       });
//       setEditingCommentId(null);
//       setEditContent("");
//       refetch(); // Recargar comentarios
//     } catch (error) {
//       console.error("Error al editar comentario:", error);
//       alert("Error al editar el comentario");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // Función para eliminar comentario
//   const handleDeleteComment = async (commentId: number) => {
//     if (!confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
//       return;
//     }

//     try {
//       setIsDeleting(commentId);
//       await deleteComment(commentId);
//       refetch(); // Recargar comentarios
//     } catch (error) {
//       console.error("Error al eliminar comentario:", error);
//       alert("Error al eliminar el comentario");
//     } finally {
//       setIsDeleting(null);
//     }
//   };

//   // Función para iniciar respuesta
//   const handleStartReply = (commentId: number) => {
//     setReplyingToCommentId(commentId);
//   };

//   // Función para cancelar respuesta
//   const handleCancelReply = () => {
//     setReplyingToCommentId(null);
//   };

//   // Función para alternar la visualización de respuestas
//   const toggleReplies = (commentId: number) => {
//     setExpandedComments(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(commentId)) {
//         newSet.delete(commentId);
//       } else {
//         newSet.add(commentId);
//       }
//       return newSet;
//     });
//   };

//   // Función para verificar si un comentario está expandido
//   const isCommentExpanded = (commentId: number): boolean => {
//     return expandedComments.has(commentId);
//   };

//   // Función para cargar más comentarios
//   const handleLoadMoreComments = () => {
//     setVisibleCommentsCount(prev => prev + 3);
//   };

//   // Función para obtener los comentarios visibles
//   const getVisibleComments = (comments: PostComment[]): PostComment[] => {
//     return comments.slice(0, visibleCommentsCount);
//   };

//   // Función para verificar si hay más comentarios por mostrar
//   const hasMoreComments = (comments: PostComment[]): boolean => {
//     return comments.length > visibleCommentsCount;
//   };

//   // Función para obtener el número de comentarios restantes
//   const getRemainingCommentsCount = (comments: PostComment[]): number => {
//     return Math.max(0, comments.length - visibleCommentsCount);
//   };

//   // Función para manejar comentario agregado
//   const handleCommentAdded = (parentId?: number) => {
//     setReplyingToCommentId(null);
    
//     // Si se agregó una respuesta, expandir el comentario padre automáticamente
//     if (parentId) {
//       setExpandedComments(prev => new Set(prev).add(parentId));
//     } else {
//       // Si es un comentario principal nuevo, resetear el contador para mostrar todos los comentarios
//       setVisibleCommentsCount(3);
//     }
    
//     refetch(); // Recargar comentarios
//   };

//   // Función para organizar comentarios en jerarquía completa
//   const organizeComments = (comments: PostComment[]): { parent: PostComment; replies: PostComment[] }[] => {
//     // La API ya viene con la estructura anidada, solo necesitamos mapearla
//     return comments.map(parent => ({
//       parent,
//       replies: parent.respuestas || []
//     }));
//   };

//   // Función para aplanar comentarios anidados (para búsquedas y operaciones)
//   const flattenComments = (comments: PostComment[]): PostComment[] => {
//     const flattened: PostComment[] = [];
    
//     const flatten = (commentList: PostComment[]) => {
//       commentList.forEach(comment => {
//         flattened.push(comment);
//         if (comment.respuestas && comment.respuestas.length > 0) {
//           flatten(comment.respuestas);
//         }
//       });
//     };
    
//     flatten(comments);
//     return flattened;
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//           <svg className="w-5 h-5 mr-2 text-azul-codea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//           </svg>
//           Comentarios
//         </h3>
//         <div className="flex items-center justify-center py-6">
//           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-azul-codea"></div>
//           <span className="ml-3 text-gray-600">Cargando comentarios...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//           <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           Comentarios
//         </h3>
//         <div className="text-center py-6">
//           <p className="text-gray-600 mb-3">Error al cargar los comentarios</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-azul-codea hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
//           >
//             Reintentar
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!comments || comments.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//             <svg className="w-5 h-5 mr-2 text-azul-codea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//             Comentarios
//           </h3>

//           {/* Botón Like del Blog */}
//           <button
//             onClick={handleToggleLike}
//             disabled={isLikingBlog}
//             className={`flex items-center space-x-2 hover:scale-110 transition ${
//               isBlogLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
//             } ${isLikingBlog ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {isBlogLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
//             <span>{isBlogLiked ? "Te gusta" : "Me gusta"}</span>
//             {likesCount > 0 && (
//               <span className="ml-1 font-medium text-sm">({likesCount})</span>
//             )}
//           </button>
//         </div>
        
//         <div className="text-center py-6">
//           <div className="text-gray-400 text-3xl mb-2">💬</div>
//           <p className="text-gray-600 mb-1">No hay comentarios aún</p>
//           <p className="text-sm text-gray-500">Sé el primero en comentar este blog</p>
//         </div>

//         {/* Formulario para comentarios principales - OCULTO */}
//         <div className="mt-6 hidden">
//           <CommentForm
//             blogId={blogId}
//             parentId={null}
//             onCommentAdded={() => handleCommentAdded()}
//             placeholder="Escribe el primer comentario..."
//           />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-2 mt-8">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//           <svg className="w-5 h-5 mr-2 text-azul-codea" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//           </svg>
//           Comentarios
//           <span className="ml-3 bg-azul-codea text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
//             {flattenComments(comments).length}
//           </span>
//         </h3>
        
//       </div>

//       {/* Formulario para nuevos comentarios principales */}
//       <div className="mb-6 pt-6 border-t border-gray-200">
//         <h4 className="text-lg font-medium text-gray-900 mb-4">Agregar comentario</h4>
//         <CommentForm
//           blogId={blogId}
//           parentId={null}
//           onCommentAdded={() => handleCommentAdded()}
//           placeholder="Escribe tu comentario..."
//         />
//       </div>

//       <div className="space-y-6">
//         {organizeComments(getVisibleComments(comments)).map(({ parent, replies }) => (
//           <div key={parent.id} className="space-y-4">
//             {/* Comentario principal */}
//             <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
//               {/* Header del comentario */}
//               <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-gradient-to-br from-azul-codea to-blue-600 rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm font-medium">
//                       {parent.autor.usuario_unico.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900">{parent.autor.usuario_unico}</p>
//                     <p className="text-xs text-gray-500">
//                       {new Date(parent.creado_en).toLocaleDateString('es-ES', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Contenido del comentario */}
//               <div className="pl-11">
//                 {editingCommentId === parent.id && isCurrentUserAuthor(parent) ? (
//                   <div className="space-y-3">
//                     <textarea
//                       value={editContent}
//                       onChange={(e) => setEditContent(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent resize-none"
//                       rows={3}
//                       placeholder="Escribe tu comentario..."
//                     />
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => handleSaveEdit(parent.id)}
//                         disabled={isUpdating || !editContent.trim()}
//                         className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-azul-codea hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//                       >
//                         {isUpdating ? (
//                           <>
//                             <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
//                             Guardando...
//                           </>
//                         ) : (
//                           <>
//                             <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             Guardar
//                           </>
//                         )}
//                       </button>
//                       <button
//                         onClick={handleCancelEdit}
//                         disabled={isUpdating}
//                         className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50 transition-colors duration-200"
//                       >
//                         <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                         Cancelar
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
//                     {parent.contenido}
//                   </p>
//                 )}
//               </div>

//               {/* Acciones del comentario */}
//               <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
//                 <div className="flex items-center space-x-4">
//                   <button 
//                     onClick={() => handleStartReply(parent.id)}
//                     className="flex items-center text-sm text-gray-500 hover:text-azul-codea transition-colors duration-200"
//                   >
//                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                     </svg>
//                     Responder
//                   </button>
                  
//                   {/* Botón Ver respuestas - Solo si hay respuestas */}
//                   {replies.length > 0 && (
//                     <button 
//                       onClick={() => toggleReplies(parent.id)}
//                       className="flex items-center text-sm text-gray-500 hover:text-azul-codea transition-colors duration-200"
//                     >
//                       <svg className={`w-4 h-4 mr-1 transition-transform duration-200 ${isCommentExpanded(parent.id) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                       {isCommentExpanded(parent.id) ? 'Ocultar respuestas' : `Ver ${replies.length} respuesta${replies.length > 1 ? 's' : ''}`}
//                     </button>
//                   )}
//                 </div>

//                 {/* Botones de gestión del comentario - Solo para el autor */}
//                 {isCurrentUserAuthor(parent) && (
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => handleStartEdit(parent)}
//                       disabled={editingCommentId === parent.id}
//                       className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50"
//                     >
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                       </svg>
//                       Editar
//                     </button>
//                     <button
//                       onClick={() => handleDeleteComment(parent.id)}
//                       disabled={isDeleting === parent.id}
//                       className="flex items-center text-sm text-gray-500 hover:text-red-600 transition-colors duration-200 disabled:opacity-50"
//                     >
//                       {isDeleting === parent.id ? (
//                         <>
//                           <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-500 mr-1"></div>
//                           Eliminando...
//                         </>
//                       ) : (
//                         <>
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           Eliminar
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Formulario de respuesta */}
//             {replyingToCommentId === parent.id && (
//               <div className="ml-8 border-l-2 border-gray-200 pl-4">
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <h4 className="text-sm font-medium text-gray-700 mb-3">
//                     Respondiendo a {parent.autor.usuario_unico}
//                   </h4>
//                   <CommentForm
//                     blogId={blogId}
//                     parentId={parent.id}
//                     onCommentAdded={() => handleCommentAdded(parent.id)}
//                     placeholder={`Responder a ${parent.autor.usuario_unico}...`}
//                   />
//                   <button
//                     onClick={handleCancelReply}
//                     className="mt-2 text-sm text-gray-500 hover:text-gray-700"
//                   >
//                     Cancelar respuesta
//                   </button>
//                 </div>
//               </div>
//             )}

           

//             {/* Respuestas - Solo se muestran si el comentario está expandido */}
//             {replies.length > 0 && isCommentExpanded(parent.id) && (
//               <div className="ml-8 space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-300">
//                 {replies.map((reply) => (
//                   <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
//                     <div className="bg-gray-50 rounded-lg p-3">
//                       {/* Header de la respuesta */}
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center space-x-2">
//                           <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
//                             <span className="text-white text-xs font-medium">
//                               {reply.autor.usuario_unico.charAt(0).toUpperCase()}
//                             </span>
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-900">{reply.autor.usuario_unico}</p>
//                             <p className="text-xs text-gray-500">
//                               {new Date(reply.creado_en).toLocaleDateString('es-ES', {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit'
//                               })}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Contenido de la respuesta */}
//                       <div className="ml-8">
//                         {editingCommentId === reply.id && isCurrentUserAuthor(reply) ? (
//                           <div className="space-y-2">
//                             <textarea
//                               value={editContent}
//                               onChange={(e) => setEditContent(e.target.value)}
//                               className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-azul-codea focus:border-transparent resize-none"
//                               rows={2}
//                               placeholder="Escribe tu respuesta..."
//                             />
//                             <div className="flex items-center space-x-1">
//                               <button
//                                 onClick={() => handleSaveEdit(reply.id)}
//                                 disabled={isUpdating || !editContent.trim()}
//                                 className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-azul-codea hover:bg-blue-700 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//                               >
//                                 {isUpdating ? (
//                                   <>
//                                     <div className="animate-spin rounded-full h-2 w-2 border-b-2 border-white mr-1"></div>
//                                     Guardando...
//                                   </>
//                                 ) : (
//                                   "Guardar"
//                                 )}
//                               </button>
//                               <button
//                                 onClick={handleCancelEdit}
//                                 disabled={isUpdating}
//                                 className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 transition-colors duration-200"
//                               >
//                                 Cancelar
//                               </button>
//                             </div>
//                           </div>
//                         ) : (
//                           <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
//                             {reply.contenido}
//                           </p>
//                         )}
//                       </div>

//                       {/* Acciones de la respuesta */}
//                       <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
//                         <div className="flex items-center space-x-3">
//                           <button 
//                             onClick={() => handleStartReply(reply.id)}
//                             className="text-xs text-gray-500 hover:text-azul-codea transition-colors duration-200"
//                           >
//                             Responder
//                           </button>
//                         </div>

//                         {/* Botones de gestión de la respuesta - Solo para el autor */}
//                         {isCurrentUserAuthor(reply) && (
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={() => handleStartEdit(reply)}
//                               disabled={editingCommentId === reply.id}
//                               className="text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50"
//                             >
//                               Editar
//                             </button>
//                             <button
//                               onClick={() => handleDeleteComment(reply.id)}
//                               disabled={isDeleting === reply.id}
//                               className="text-xs text-gray-500 hover:text-red-600 transition-colors duration-200 disabled:opacity-50"
//                             >
//                               {isDeleting === reply.id ? "Eliminando..." : "Eliminar"}
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Formulario de respuesta para esta respuesta específica */}
//                     {replyingToCommentId === reply.id && (
//                       <div className="mt-3 ml-4 border-l-2 border-gray-300 pl-4">
//                         <div className="bg-white rounded-lg p-3 border border-gray-200">
//                           <h4 className="text-xs font-medium text-gray-600 mb-2">
//                             Respondiendo a {reply.autor.usuario_unico}
//                           </h4>
//                           <CommentForm
//                             blogId={blogId}
//                             parentId={reply.id}
//                             onCommentAdded={() => handleCommentAdded(parent.id)}
//                             placeholder={`Responder a ${reply.autor.usuario_unico}...`}
//                           />
//                           <button
//                             onClick={handleCancelReply}
//                             className="mt-2 text-xs text-gray-500 hover:text-gray-700"
//                           >
//                             Cancelar respuesta
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {/* Respuestas a esta respuesta (anidamiento más profundo) */}
//                     {reply.respuestas && reply.respuestas.length > 0 && (
//                       <div className="mt-3 ml-4">
//                         {reply.respuestas.map((nestedReply) => (
//                           <div key={nestedReply.id} className="border-l-2 border-gray-300 pl-4 mb-3">
//                             <div className="bg-white rounded-lg p-3 border border-gray-200">
//                               {/* Header de la respuesta anidada */}
//                               <div className="flex items-center justify-between mb-2">
//                                 <div className="flex items-center space-x-2">
//                                   <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
//                                     <span className="text-white text-xs font-medium">
//                                       {nestedReply.autor.usuario_unico.charAt(0).toUpperCase()}
//                                     </span>
//                                   </div>
//                                   <div>
//                                     <p className="text-xs font-medium text-gray-900">{nestedReply.autor.usuario_unico}</p>
//                                     <p className="text-xs text-gray-500">
//                                       {new Date(nestedReply.creado_en).toLocaleDateString('es-ES', {
//                                         year: 'numeric',
//                                         month: 'short',
//                                         day: 'numeric',
//                                         hour: '2-digit',
//                                         minute: '2-digit'
//                                       })}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>

//                               {/* Contenido de la respuesta anidada */}
//                               <div className="ml-7">
//                                 <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
//                                   {nestedReply.contenido}
//                                 </p>
//                               </div>

//                               {/* Acciones de la respuesta anidada */}
//                               <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
//                                 <div className="flex items-center space-x-2">
//                                   <button 
//                                     onClick={() => handleStartReply(nestedReply.id)}
//                                     className="text-xs text-gray-500 hover:text-azul-codea transition-colors duration-200"
//                                   >
//                                     Responder
//                                   </button>
//                                 </div>

//                                 {/* Botones de gestión - Solo para el autor */}
//                                 {isCurrentUserAuthor(nestedReply) && (
//                                   <div className="flex items-center space-x-2">
//                                     <button
//                                       onClick={() => handleStartEdit(nestedReply)}
//                                       disabled={editingCommentId === nestedReply.id}
//                                       className="text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50"
//                                     >
//                                       Editar
//                                     </button>
//                                     <button
//                                       onClick={() => handleDeleteComment(nestedReply.id)}
//                                       disabled={isDeleting === nestedReply.id}
//                                       className="text-xs text-gray-500 hover:text-red-600 transition-colors duration-200 disabled:opacity-50"
//                                     >
//                                       {isDeleting === nestedReply.id ? "Eliminando..." : "Eliminar"}
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Botón Ver más comentarios */}
//       {hasMoreComments(comments) && (
//         <div className="mt-6 text-center">
//           <button
//             onClick={handleLoadMoreComments}
//             className="inline-flex items-center px-6 py-3 bg-azul-codea hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//             Ver más comentarios
//             <span className="ml-2 bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
//               {getRemainingCommentsCount(comments)} restantes
//             </span>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };
