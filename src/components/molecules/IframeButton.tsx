import React from 'react';
import IframeModal from './IframeModal';
import { useIframeModal } from '../../hooks/useIframeModal';

interface IframeButtonProps {
  url: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonClassName?: string;
  icon?: React.ReactNode;
}

const IframeButton: React.FC<IframeButtonProps> = ({
  url,
  title,
  description,
  buttonText = 'Ver Contenido',
  buttonClassName = 'bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] hover:from-[#4AB39A] hover:to-[#3FA08A] text-white px-6 py-3 rounded-lg ',
  icon
}) => {
  const { isOpen, openModal, closeModal, url: modalUrl, title: modalTitle } = useIframeModal();

  const handleClick = () => {
    openModal(url, title, description);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={buttonClassName}
      >
        {icon}
        <span>{buttonText}</span>
      </button>

      <IframeModal
        isOpen={isOpen}
        onClose={closeModal}
        url={modalUrl}
        title={modalTitle}
      />
    </>
  );
};

export default IframeButton;
