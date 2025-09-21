# Sistema de Comentarios - Atomic Design

Este directorio contiene el sistema completo de comentarios refactorizado siguiendo los principios de Atomic Design para máxima reutilización y mantenibilidad.

## Estructura

```
comments/
├── atoms/           # Componentes básicos reutilizables
├── molecules/       # Combinaciones de átomos
├── organisms/       # Componentes complejos con lógica
├── templates/       # Plantillas principales
├── hooks/          # Lógica personalizada
├── types/          # Tipos e interfaces
└── index.ts        # Exportaciones principales
```

## Componentes por Nivel

### Atoms (Átomos)
- `Avatar`: Avatar circular con inicial del usuario
- `Button`: Botón reutilizable con variantes
- `TextArea`: Campo de texto multilínea
- `LoadingSpinner`: Indicador de carga
- `ErrorMessage`: Mensaje de error con opción de reintento
- `EmptyState`: Estado vacío con icono y mensaje

### Molecules (Moléculas)
- `CommentHeader`: Header con avatar, nombre y fecha
- `CommentActions`: Botones de acciones (responder, editar, eliminar)
- `CommentContent`: Contenido del comentario con modo edición
- `BlogLikesButton`: Botón de likes para el blog

### Organisms (Organismos)
- `CommentForm`: Formulario para crear comentarios
- `SingleComment`: Componente de comentario individual
- `ReplyForm`: Formulario para respuestas
- `CommentThread`: Hilo completo de comentarios con respuestas anidadas

### Templates (Plantillas)
- `CommentsTemplate`: Plantilla principal para comentarios de blogs
- `ArticleCommentsTemplate`: Plantilla específica para comentarios de artículos

## Hooks Personalizados

### `useComments`
Maneja toda la lógica de comentarios:
- Carga de comentarios
- Estados de edición/eliminación
- Gestión de respuestas
- Paginación
- Verificación de autoría

### `useBlogLikes`
Maneja la lógica de likes del blog:
- Estado de like del usuario
- Contador de likes
- Toggle de likes

### `useArticleComments`
Maneja toda la lógica de comentarios de artículos:
- Carga de comentarios de artículos
- Estados de edición/eliminación
- Gestión de respuestas
- Paginación
- Verificación de autoría

### `useArticleLikes`
Maneja la lógica de likes de artículos:
- Estado de like del usuario
- Contador de likes
- Toggle de likes

## Uso

### Importación básica
```typescript
import { CommentsTemplate, ArticleCommentsTemplate } from '../comments';

// Uso para blogs
<CommentsTemplate blogId={blogId} />

// Uso para artículos
<ArticleCommentsTemplate articleId={articleId} />
```

### Importación de componentes individuales
```typescript
import { CommentForm, ArticleCommentForm, CommentHeader, Avatar } from '../comments';

// Uso de componentes específicos para blogs
<CommentForm 
  blogId={blogId} 
  onCommentAdded={() => refetch()} 
/>

// Uso de componentes específicos para artículos
<ArticleCommentForm 
  blogId={articleId} 
  onCommentAdded={() => refetch()} 
/>
```

### Uso de hooks
```typescript
import { useComments, useBlogLikes, useArticleComments, useArticleLikes } from '../comments';

// Para blogs
const { comments, loading, handleStartEdit } = useComments(blogId);
const { likesState, handleToggleLike } = useBlogLikes(blogId);

// Para artículos
const { comments, loading, handleStartEdit } = useArticleComments(articleId);
const { likesState, handleToggleLike } = useArticleLikes(articleId);
```

## Características

### ✅ Funcionalidades Implementadas
- ✅ Crear comentarios principales
- ✅ Responder a comentarios (con anidamiento)
- ✅ Editar comentarios propios
- ✅ Eliminar comentarios propios
- ✅ Ver/ocultar respuestas
- ✅ Paginación de comentarios
- ✅ Estados de carga y error
- ✅ Estados vacíos con formulario de comentario
- ✅ Verificación de autoría
- ✅ Interfaz responsive
- ✅ Formulario siempre visible (incluso sin comentarios)
- ✅ Separación clara entre likes del contenido y comentarios

### 🎨 Características de UI/UX
- ✅ Animaciones suaves
- ✅ Feedback visual inmediato
- ✅ Indicadores de carga
- ✅ Confirmaciones de eliminación
- ✅ Diseño jerárquico claro
- ✅ Colores consistentes con el tema
- ✅ Formulario de comentarios siempre accesible
- ✅ Placeholder contextual ("Escribe el primer comentario...")
- ✅ Estados vacíos informativos con call-to-action

### 🔧 Características Técnicas
- ✅ TypeScript completo
- ✅ Hooks personalizados
- ✅ Separación de responsabilidades
- ✅ Componentes reutilizables
- ✅ Atomic Design
- ✅ Manejo de errores
- ✅ Optimización de rendimiento

## Configuración

El sistema está diseñado para ser completamente configurable. Todas las opciones están en `types/index.ts`:

```typescript
export interface CommentConfig {
  initialVisibleComments: number;
  commentsToLoad: number;
  enableEditing: boolean;
  enableDeleting: boolean;
  enableReplies: boolean;
  enableNestedReplies: boolean;
  maxNestingLevel: number;
}
```

## Migración

Para migrar del sistema anterior:

1. **Reemplazar importación:**
   ```typescript
   // Antes
   import { BlogCommentsList } from '../organisms/CommentsList';
   
   // Después
   import { CommentsTemplate } from '../comments';
   ```

2. **Reemplazar uso:**
   ```typescript
   // Antes
   <BlogCommentsList blogId={id} />
   
   // Después
   <CommentsTemplate blogId={id} />
   ```

## Extensibilidad

El sistema está diseñado para ser fácilmente extensible:

- **Nuevos átomos**: Agregar en `atoms/` y exportar en `index.ts`
- **Nuevas moléculas**: Combinar átomos existentes en `molecules/`
- **Nuevos organismos**: Lógica compleja en `organisms/`
- **Nuevos hooks**: Lógica reutilizable en `hooks/`

## Servicios y APIs

### Blogs
- Comentarios: `/api/v1/blog/comentarios/`
- Likes: `/api/v1/blog/blogs/{id}/likes_list/`

### Artículos
- Comentarios: `/api/v1/articles/comentarios/`
- Likes: `/api/v1/articles/articulos/{id}/likes_list/`

## Arquitectura de Likes

### 📍 Ubicación de Likes
Los likes están asociados al **contenido principal** (blog/artículo), no a los comentarios:

- **ContentSection**: Maneja los likes del blog/artículo
- **CommentsTemplate**: Solo maneja comentarios (sin likes)
- **ArticleCommentsTemplate**: Solo maneja comentarios (sin likes)

### 🔄 Flujo de Likes
1. **Blogs**: `ContentSection` → `getBlogLikes()` / `toggleLike()`
2. **Artículos**: `ContentSection` → `getArticleLikes()` / `toggleArticleLike()`
3. **Comentarios**: Sistemas independientes sin likes propios

## Próximos Pasos

Para integrar con una nueva API:

1. **Para blogs**: Actualizar los servicios en `hooks/useComments.ts` y `hooks/useBlogLikes.ts`
2. **Para artículos**: Actualizar los servicios en `hooks/useArticleComments.ts` y `hooks/useArticleLikes.ts`
3. Ajustar los tipos en `types/index.ts` si es necesario
4. El resto del sistema permanece igual

El sistema mantiene la misma interfaz externa, por lo que la migración será transparente para los componentes que lo usen.

## Estructura de Archivos Completada

```
comments/
├── atoms/                    # Componentes básicos
│   ├── Avatar.tsx
│   ├── Button.tsx
│   ├── TextArea.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   ├── EmptyState.tsx
│   └── index.ts
├── molecules/                # Combinaciones de átomos
│   ├── CommentHeader.tsx
│   ├── CommentActions.tsx
│   ├── CommentContent.tsx
│   ├── BlogLikesButton.tsx
│   └── index.ts
├── organisms/                # Componentes complejos
│   ├── CommentForm.tsx          # Para blogs
│   ├── ArticleCommentForm.tsx   # Para artículos
│   ├── SingleComment.tsx
│   ├── ReplyForm.tsx            # Para blogs
│   ├── ArticleReplyForm.tsx     # Para artículos
│   ├── CommentThread.tsx        # Para blogs
│   ├── ArticleCommentThread.tsx # Para artículos
│   └── index.ts
├── templates/                # Plantillas principales
│   ├── CommentsTemplate.tsx     # Para blogs
│   ├── ArticleCommentsTemplate.tsx # Para artículos
│   └── index.ts
├── hooks/                    # Lógica personalizada
│   ├── useComments.ts           # Para blogs
│   ├── useBlogLikes.ts
│   ├── useArticleComments.ts    # Para artículos
│   ├── useArticleLikes.ts
│   └── index.ts
├── types/                    # Tipos e interfaces
│   └── index.ts
├── index.ts                  # Exportaciones principales
└── README.md                 # Documentación
```
