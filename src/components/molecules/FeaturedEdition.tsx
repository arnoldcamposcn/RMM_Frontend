import React from 'react';
import Title from '../atoms/Title';
import Paragraph from '../atoms/Paragraph';
import { cleanRichText } from '../../utils/cleanRichText';
import IframeModal from './IframeModal';
import { useIframeModal } from '../../hooks/useIframeModal';

interface FeaturedEditionProps {
  image: string;
  title: string;
  description: string;
  metadata?: {
    date?: string;
    edition?: number;
    url?: string;
  };
  className?: string;
}

const FeaturedEdition: React.FC<FeaturedEditionProps> = ({
  image,
  title,
  description,
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
    <div className={`bg-white rounded-lg ${className}`}>
      <div className="relative h-64 md:h-96 overflow-hidden rounded-md">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="py-6">
        <Title className="mb-2">{title}</Title>

        <Paragraph className="mb-4 leading-relaxed">
          {cleanRichText(description)}
        </Paragraph>

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

      {/* Modal con iframe reutilizable */}
      <IframeModal
        isOpen={isOpen}
        onClose={closeModal}
        url={url}
        title={modalTitle}
      />
    </div>
  );
};

export default FeaturedEdition;
