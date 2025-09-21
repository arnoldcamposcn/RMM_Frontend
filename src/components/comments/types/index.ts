// Re-exportar tipos del schema existente
export type { PostComment, CreateComment } from '../../../schema/blog/blog';
export type { 
  ArticlePostComment, 
  ArticleCreateComment, 
  ArticleUpdateComment,
  ArticleLikes 
} from '../../../schema/article/article';
export type { Profile } from '../../../store/features/profile/profileSchema';

// Interfaces específicas para el sistema de comentarios
export interface CommentFormProps {
  blogId: number;
  parentId?: number | null;
  onCommentAdded?: () => void;
  placeholder?: string;
}

export interface SingleCommentProps {
  commentId: number;
}

export interface BlogCommentsListProps {
  blogId: number;
}

export interface CommentHeaderProps {
  author: string;
  createdAt: string;
  size?: 'small' | 'medium' | 'large';
}

export interface CommentActionsProps {
  onReply: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
  showReplies?: boolean;
  repliesCount?: number;
  isExpanded?: boolean;
  onToggleReplies?: () => void;
}

export interface CommentContentProps {
  content: string;
  isEditing?: boolean;
  editContent?: string;
  onEditContentChange?: (content: string) => void;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
  isUpdating?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export interface CommentReplyProps {
  replies: any[];
  isExpanded: boolean;
  onToggleExpanded: () => void;
  blogId: number;
  onCommentAdded: (parentId?: number) => void;
  onStartReply: (commentId: number) => void;
  replyingToCommentId: number | null;
  onCancelReply: () => void;
}

export interface AvatarProps {
  username: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit';
  className?: string;
}

export interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  children?: React.ReactNode;
}

// Estados y configuración
export interface CommentState {
  editingCommentId: number | null;
  editContent: string;
  isUpdating: boolean;
  isDeleting: number | null;
  replyingToCommentId: number | null;
  expandedComments: Set<number>;
  visibleCommentsCount: number;
}

export interface BlogLikesState {
  isBlogLiked: boolean;
  likesCount: number;
  isLikingBlog: boolean;
}

export interface CommentConfig {
  initialVisibleComments: number;
  commentsToLoad: number;
  enableEditing: boolean;
  enableDeleting: boolean;
  enableReplies: boolean;
  enableNestedReplies: boolean;
  maxNestingLevel: number;
}
