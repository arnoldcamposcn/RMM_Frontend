# Dashboard de Administración Editorial

## Descripción
Dashboard completo para la gestión editorial de la revista Meta Mining, que permite administrar revistas, artículos y noticias de manera eficiente y con una interfaz moderna.

## Características

### 🎯 Funcionalidades Principales
- **Gestión de Revistas**: Crear, editar y eliminar ediciones de revista
- **Gestión de Artículos**: Administrar artículos con categorías y contenido
- **Gestión de Noticias**: Crear noticias con artículos relacionados
- **Interfaz Responsiva**: Adaptable a diferentes tamaños de pantalla
- **Modales de Confirmación**: Para acciones destructivas
- **Navegación Intuitiva**: Sidebar con secciones organizadas

### 🎨 Diseño y UX
- **Diseño Moderno**: Utiliza gradientes y sombras para una apariencia profesional
- **Animaciones Suaves**: Transiciones y efectos hover para mejor experiencia
- **Iconografía Consistente**: Uso de React Icons para iconos coherentes
- **Colores Temáticos**: Sistema de colores diferenciado por categorías
- **Modo Oscuro**: Soporte para preferencias de color del sistema

## Estructura del Dashboard

### 📋 Sección 1: Revistas
#### Añadir Edición
- Número de edición
- Título
- Descripción corta
- Imagen
- Fecha de publicación
- Versión impresa (URL)

#### Modificar Edición
- Formulario precargado con datos existentes
- Opciones para ver histórico y vista previa
- Confirmación antes de eliminar

### 📰 Sección 2: Artículos
#### Añadir Artículo
- Título
- Categoría (Tecnología, Innovación, Sostenibilidad, Mercado)
- Contenido
- Fecha de publicación
- Imagen principal
- Banner

#### Modificar Artículo
- Listado de artículos existentes
- Formulario de edición precargado
- Gestión de versiones

### 📰 Sección 3: Noticias
#### Añadir Noticia
- Título
- Categoría
- Contenido
- Fecha de publicación
- Imagen principal
- Banner
- Artículos relacionados (selección múltiple)

#### Modificar Noticia
- Gestión completa de noticias existentes
- Relación con artículos
- Sistema de categorización

## Componentes Técnicos

### 🏗️ Arquitectura
- **React + TypeScript**: Tipado fuerte para mejor mantenibilidad
- **Hooks**: useState para gestión de estado local
- **CSS Personalizado**: Estilos específicos para el dashboard
- **Componentes Modulares**: Formularios y tarjetas reutilizables

### 🎨 Estilos
- **CSS Custom Properties**: Variables para colores y espaciado
- **Responsive Design**: Breakpoints para móvil, tablet y desktop
- **Animaciones CSS**: Keyframes para transiciones suaves
- **Gradientes**: Efectos visuales modernos

### 🔧 Funcionalidades
- **Validación de Formularios**: Campos requeridos y tipos de datos
- **Subida de Archivos**: Inputs para imágenes y banners
- **Modales**: Confirmación de acciones destructivas
- **Navegación**: Sistema de rutas interno

## Uso del Dashboard

### 🚀 Navegación
1. **Sidebar Principal**: Selecciona la sección (Revistas, Artículos, Noticias)
2. **Submenú**: Elige entre "Añadir" o "Modificar"
3. **Formularios**: Completa los campos requeridos
4. **Acciones**: Guarda, cancela o elimina según sea necesario

### 📝 Formularios
- **Campos Obligatorios**: Marcados visualmente
- **Validación en Tiempo Real**: Feedback inmediato
- **Subida de Archivos**: Drag & drop para imágenes
- **Autoguardado**: Prevención de pérdida de datos

### 🗑️ Eliminación
- **Confirmación Doble**: Modal de confirmación antes de eliminar
- **Feedback Visual**: Estados de carga y confirmación
- **Recuperación**: Posibilidad de deshacer acciones

## Personalización

### 🎨 Colores y Temas
```css
/* Variables CSS personalizables */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1d4ed8;
  --success-color: #10b981;
  --danger-color: #ef4444;
  --warning-color: #f59e0b;
}
```

### 📱 Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### 🔧 Configuración
- **Categorías**: Modificables en el código
- **Campos**: Agregables en las interfaces TypeScript
- **Validaciones**: Personalizables en cada formulario

## Integración

### 🔌 APIs
El dashboard está preparado para integrarse con:
- **Backend Django**: Endpoints REST para CRUD operations
- **Base de Datos**: PostgreSQL o SQLite
- **Almacenamiento**: AWS S3 o local para archivos
- **Autenticación**: JWT tokens o session-based

### 📊 Datos de Ejemplo
Incluye datos de demostración para:
- Edición de revista con URL de versión impresa
- Artículo sobre "El Futuro de la Minería"
- Noticia sobre "IA y Big Data en Minería"

## Mejoras Futuras

### 🚀 Funcionalidades Planificadas
- **Editor Rich Text**: WYSIWYG para contenido
- **Gestión de Usuarios**: Roles y permisos
- **Analytics**: Métricas de contenido
- **Notificaciones**: Sistema de alertas
- **Exportación**: PDF, Excel de contenido
- **Búsqueda**: Filtros avanzados
- **Historial**: Versionado de cambios

### 🔧 Mejoras Técnicas
- **Estado Global**: Redux o Zustand
- **Caché**: React Query para datos
- **Testing**: Jest y Testing Library
- **PWA**: Funcionalidad offline
- **Accesibilidad**: ARIA labels y navegación por teclado

## Soporte

Para soporte técnico o consultas sobre el dashboard, contactar al equipo de desarrollo.

---
*Dashboard desarrollado para Revista Meta Mining - Gestión Editorial Digital*
