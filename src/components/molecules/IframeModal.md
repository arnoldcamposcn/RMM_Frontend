# IframeModal Components

Componentes reutilizables para mostrar contenido en iframes dentro de modales.

## Componentes Disponibles

### 1. IframeModal

Modal reutilizable que muestra contenido en un iframe.

#### Props

```typescript
interface IframeModalProps {
  isOpen: boolean;           // Estado de apertura del modal
  onClose: () => void;       // Función para cerrar el modal
  url: string;              // URL del contenido a mostrar
  title: string;            // Título del modal
  description?: string;     // Descripción opcional
  className?: string;       // Clases CSS adicionales
}
```

#### Uso Básico

```tsx
import IframeModal from './IframeModal';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Abrir Modal
      </button>
      
      <IframeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        url="https://example.com"
        title="Mi Contenido"
        description="Descripción del contenido"
      />
    </>
  );
};
```

### 2. useIframeModal Hook

Hook personalizado para manejar el estado del modal de iframe.

#### Retorno

```typescript
interface UseIframeModalReturn {
  isOpen: boolean;                                    // Estado del modal
  openModal: (url: string, title: string, description?: string) => void;
  closeModal: () => void;
  url: string;                                       // URL actual
  title: string;                                     // Título actual
  description?: string;                              // Descripción actual
}
```

#### Uso con Hook

```tsx
import { useIframeModal } from '../../hooks/useIframeModal';
import IframeModal from './IframeModal';

const MyComponent = () => {
  const { isOpen, openModal, closeModal, url, title, description } = useIframeModal();

  const handleOpen = () => {
    openModal(
      'https://example.com',
      'Mi Título',
      'Mi descripción'
    );
  };

  return (
    <>
      <button onClick={handleOpen}>
        Abrir Modal
      </button>
      
      <IframeModal
        isOpen={isOpen}
        onClose={closeModal}
        url={url}
        title={title}
        description={description}
      />
    </>
  );
};
```

### 3. IframeButton

Componente de botón que incluye automáticamente el modal de iframe.

#### Props

```typescript
interface IframeButtonProps {
  url: string;                    // URL del contenido
  title: string;                  // Título del modal
  description?: string;           // Descripción opcional
  buttonText?: string;           // Texto del botón
  buttonClassName?: string;      // Clases CSS del botón
  icon?: React.ReactNode;        // Ícono opcional
}
```

#### Uso Simple

```tsx
import IframeButton from './IframeButton';

const MyComponent = () => {
  return (
    <IframeButton
      url="https://example.com"
      title="Mi Contenido"
      description="Descripción del contenido"
      buttonText="Ver Contenido"
      icon={<MyIcon />}
    />
  );
};
```

## Características

### ✅ Funcionalidades Incluidas

- **Modal responsivo** que se adapta a diferentes tamaños de pantalla
- **Iframe seguro** con sandbox para prevenir XSS
- **Múltiples formas de cerrar**: botón X, botón Cerrar, tecla Escape, click fuera
- **Opción de abrir en nueva pestaña**
- **Prevención de scroll** del body cuando el modal está abierto
- **Animaciones suaves** y transiciones profesionales
- **Accesibilidad** mejorada con aria-labels y focus management

### ✅ Personalización

- **Colores**: Usa la paleta de colores de la revista (`#53C1A9`, `#4AB39A`)
- **Estilos**: Completamente personalizable con Tailwind CSS
- **Tamaños**: Responsive con `max-w-6xl` y `max-h-[90vh]`
- **Contenido**: Soporte para título y descripción opcional

### ✅ Seguridad

- **Sandbox**: Restringe las capacidades del iframe
- **CSP**: Compatible con Content Security Policy
- **XSS Protection**: Previene ejecución de scripts maliciosos

## Ejemplos de Uso

### En FeaturedEdition (Ya implementado)

```tsx
const { isOpen, openModal, closeModal, url, title, description } = useIframeModal();

const handleOpenIframe = () => {
  if (metadata?.url) {
    openModal(metadata.url, title, description);
  }
};

// En el JSX
<IframeModal
  isOpen={isOpen}
  onClose={closeModal}
  url={url}
  title={title}
  description={description}
/>
```

### En otros componentes

```tsx
// Para documentos PDF
<IframeButton
  url="/documents/report.pdf"
  title="Reporte Anual"
  description="Documento PDF del reporte anual"
  buttonText="Ver PDF"
/>

// Para videos embebidos
<IframeButton
  url="https://www.youtube.com/embed/videoId"
  title="Video Tutorial"
  description="Tutorial de cómo usar la aplicación"
  buttonText="Ver Video"
/>

// Para contenido externo
<IframeButton
  url="https://external-site.com/content"
  title="Contenido Externo"
  buttonText="Abrir Contenido"
/>
```

## Migración

Para migrar componentes existentes:

1. **Importar** el hook y el componente:
```tsx
import { useIframeModal } from '../../hooks/useIframeModal';
import IframeModal from './IframeModal';
```

2. **Reemplazar** el estado local:
```tsx
// Antes
const [showModal, setShowModal] = useState(false);

// Después
const { isOpen, openModal, closeModal, url, title, description } = useIframeModal();
```

3. **Actualizar** las funciones:
```tsx
// Antes
const handleOpen = () => setShowModal(true);

// Después
const handleOpen = () => openModal(url, title, description);
```

4. **Reemplazar** el JSX del modal:
```tsx
// Antes
{showModal && (
  <div className="modal-complexo">...</div>
)}

// Después
<IframeModal
  isOpen={isOpen}
  onClose={closeModal}
  url={url}
  title={title}
  description={description}
/>
```
