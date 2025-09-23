import { useState } from 'react';

interface UseIframeModalReturn {
  isOpen: boolean;
  openModal: (url: string, title: string, description?: string) => void;
  closeModal: () => void;
  url: string;
  title: string;
  description?: string;
}

export const useIframeModal = (): UseIframeModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string | undefined>();

  const openModal = (modalUrl: string, modalTitle: string, modalDescription?: string) => {
    setUrl(modalUrl);
    setTitle(modalTitle);
    setDescription(modalDescription);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Limpiar datos después de un pequeño delay para evitar parpadeos
    setTimeout(() => {
      setUrl('');
      setTitle('');
      setDescription(undefined);
    }, 300);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    url,
    title,
    description
  };
};
