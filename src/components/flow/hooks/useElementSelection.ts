
import { useState, useEffect } from "react";

export const useElementSelection = (selectedSceneId: string | null) => {
  const [currentElementId, setCurrentElementId] = useState<string | null>(null);

  // Reset element selection when scene changes
  useEffect(() => {
    setCurrentElementId(null);
  }, [selectedSceneId]);

  // Listen for selectElement and previewElement events
  useEffect(() => {
    const handleSelectElement = (e: CustomEvent) => {
      if (e.detail && e.detail.elementId) {
        setCurrentElementId(e.detail.elementId);
      }
    };

    window.addEventListener('selectElement', handleSelectElement as EventListener);
    window.addEventListener('previewElement', handleSelectElement as EventListener);
    
    return () => {
      window.removeEventListener('selectElement', handleSelectElement as EventListener);
      window.removeEventListener('previewElement', handleSelectElement as EventListener);
    };
  }, []);

  return {
    currentElementId,
    setCurrentElementId
  };
};
