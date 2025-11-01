// Custom Hook for Modal Management (Lab 2)
import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const openModal = (orchid) => {
    setSelectedOrchid(orchid);
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrchid(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  return {
    isOpen,
    selectedOrchid,
    openModal,
    closeModal
  };
};
