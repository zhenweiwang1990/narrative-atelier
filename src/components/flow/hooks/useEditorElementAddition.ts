
import { ElementType } from "@/utils/types";
import { useState, useEffect } from "react";

interface UseEditorElementAdditionProps {
  sceneId: string;
  currentElementId: string | null;
  currentElementIndex: number;
  elements: any[];
  addElement: (type: ElementType, position?: number) => string | null;
  updateElement: (id: string, updates: any) => void;
  onClose: () => void;
}

export const useEditorElementAddition = ({
  sceneId,
  currentElementId,
  currentElementIndex,
  elements,
  addElement,
  updateElement,
  onClose,
}: UseEditorElementAdditionProps) => {
  // Handle adding element before or after the current element
  const handleAddElement = (type: ElementType, position: 'before' | 'after') => {
    if (!currentElementId || currentElementIndex === -1) return;
    
    // Calculate the position to insert the new element
    const insertPosition = position === 'before' 
      ? currentElementIndex 
      : currentElementIndex + 1;
    
    // Add the new element at the calculated position
    const newElementId = addElement(type, insertPosition);
    
    // Auto-select the new element
    if (newElementId && onClose) {
      // Close the current editor
      onClose();
      
      // Small timeout to allow state updates to complete
      setTimeout(() => {
        // Dispatch custom event to notify the parent component
        if (typeof window !== 'undefined') {
          const selectEvent = new CustomEvent('selectElement', { 
            detail: { 
              elementId: newElementId,
              sceneId: sceneId
            } 
          });
          window.dispatchEvent(selectEvent);
          
          // Also dispatch an event to trigger preview of this element
          const previewEvent = new CustomEvent('previewElement', {
            detail: {
              elementId: newElementId,
              sceneId: sceneId
            }
          });
          window.dispatchEvent(previewEvent);
        }
      }, 50); // Increased timeout to ensure state updates complete
    }
  };

  return { handleAddElement };
};
