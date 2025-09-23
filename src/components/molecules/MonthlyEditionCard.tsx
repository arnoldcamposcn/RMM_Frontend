import React from 'react';
import IframeModal from './IframeModal';
import { useIframeModal } from '../../hooks/useIframeModal';
interface MonthlyEditionCardProps {
  image: string;
  month: string;
  title: string;
  year: number;
  metadata?: {
    url?: string;
  };
  className?: string;
}

const MonthlyEditionCard: React.FC<MonthlyEditionCardProps> = ({
  image,
  month,
  title,
  year,
  metadata,
  className = ''
}) => {
  const { isOpen, openModal, closeModal, url, title: modalTitle } = useIframeModal();

  const handleOpenIframe = () => {
    if (metadata?.url) {
      openModal(metadata.url, title);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-[#53C1A9]/30 transition-all duration-300 group ${className}`}>
      
      {/* Imagen */}
      <div className="relative h-52 overflow-hidden rounded-t-xl">
        <img 
          src={image} 
          alt={`Edición ${month} ${year}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Overlay gradiente elegante */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        {/* Indicador de edición en la esquina */}
        
      </div>
      {/* <p>{numero_edicion}</p> */}
      {/* <p>{titulo_edicion}</p> */}
      
      {/* Contenido */}
      <div className="p-5 flex flex-col items-center justify-center">
        {/* Mes y año con estilo magazine */}
        <div className="text-center mb-3">
          <div className="mb-3">
          <h3 className="title-magazine text-base font-bold text-[#132F56] mb-2 text-center">
          {title}</h3>
        <div className="w-12 h-0.5 bg-gradient-to-r from-[#4AB39A] to-[#3FA08A] rounded-full mx-auto"></div>
            <h3 className="title-magazine text-base font-bold text-[#132F56] mb-2 text-center pt-2">
              {month}
            </h3>
          </div>
          <p className="title-magazine text-gray-600 text-sm font-medium">
            {year}
          </p>
        </div>

        {metadata?.url && (
          <button
            onClick={handleOpenIframe}
            className="bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] hover:from-[#4AB39A] hover:to-[#3FA08A] text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-lg transform flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Ver Revista</span>
          </button>
        )}
      </div>

      <IframeModal
        isOpen={isOpen}
        onClose={closeModal}
        url={url}
        title={modalTitle}
      />
    </div>  
  );
};

export default MonthlyEditionCard;
