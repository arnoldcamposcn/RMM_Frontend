// Exportar todos los componentes principales
export { CommentsTemplate, ArticleCommentsTemplate, ForoCommentsTemplate } from './templates';

// Exportar organismos individuales si se necesitan
export { 
  CommentForm, 
  ArticleCommentForm,
  SingleComment, 
  CommentThread,
  ArticleCommentThread,
  ReplyForm,
  ArticleReplyForm,
  ForoCommentThread,
  ForoCommentForm
} from './organisms';

// Exportar moléculas individuales si se necesitan
export { CommentHeader, CommentActions, CommentContent, BlogLikesButton } from './molecules';

// Exportar átomos individuales si se necesitan
export { Avatar, Button, TextArea, LoadingSpinner, ErrorMessage, EmptyState } from './atoms';

// Exportar hooks
export { useComments, useBlogLikes, useArticleComments, useArticleLikes, useForo, useForoComments, useForoCategorias } from './hooks';

// Exportar tipos
export type * from './types';

// Exportar componentes legacy para compatibilidad
export { CommentsTemplate as BlogCommentsList } from './templates';
export { CommentsTemplate as GenericCommentsList } from './templates';

// Exportar componentes específicos para artículos
export { ArticleCommentsTemplate as ArticleCommentsList } from './templates';
