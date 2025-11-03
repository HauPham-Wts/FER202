// Custom Hook for Modal Management (Lab 2)
import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const openModal = (orchid) => {
    setSelectedOrchid(orchid);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrchid(null);
    // Scroll to top when modal closes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    isOpen,
    selectedOrchid,
    openModal,
    closeModal
  };
};
