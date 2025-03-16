
import { useEffect } from "react";
import { useElementEditor } from "./ElementEditorContext";

const SelectElementEventHandler = () => {
  const { sceneId, onSelectElement } = useElementEditor();

  // Listen for selectElement custom event
  useEffect(() => {
    const handleSelectElementEvent = (event: CustomEvent) => {
      if (event.detail.sceneId === sceneId && event.detail.elementId && onSelectElement) {
        onSelectElement(event.detail.elementId);
      }
    };
    
    window.addEventListener('selectElement', handleSelectElementEvent as EventListener);
    
    return () => {
      window.removeEventListener('selectElement', handleSelectElementEvent as EventListener);
    };
  }, [sceneId, onSelectElement]);

  return null; // This is a behavior-only component with no UI
};

export default SelectElementEventHandler;
