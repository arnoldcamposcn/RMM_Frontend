import React, { useEffect } from 'react';

interface IframeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
//   description?: string;
  className?: string;
}

const IframeModal: React.FC<IframeModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
//   description,
  className = ''
}) => {
  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // Restaurar scroll del body
    };
  }, [isOpen, onClose]);

  // Cerrar modal al hacer click fuera del contenido
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm ${className}`}
      onClick={handleBackdropClick}
    >
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] m-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header del modal */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-[#53C1A9] to-[#4AB39A]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {title}
              </h3>
              {/* {description && (
                <p className="text-sm text-white/80">
                  {description}
                </p>
              )} */}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
            aria-label="Cerrar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido del iframe */}
        <div className="h-full p-4">
          <iframe
            src={url}
            className="w-full h-full rounded-lg border border-gray-200"
            title={title}
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
          />
        </div>

        {/* Footer con opciones */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.open(url, '_blank')}
              className="flex items-center space-x-2 text-[#53C1A9] hover:text-[#4AB39A] transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="text-sm font-medium">Abrir en nueva pestaña</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="bg-[#53C1A9] hover:bg-[#4AB39A] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IframeModal;
