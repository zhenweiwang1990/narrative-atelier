
import { ElementType } from "@/utils/types";
import { useState, useEffect } from "react";

interface UseEditorElementAdditionProps {
  sceneId: string;
  currentElementId: string | null;
  currentElementIndex: number;
  elements: any[];
  addElement: (type: ElementType, order?: number) => string | null;
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
    
    // Get the current element
    const currentElement = elements.find(e => e.id === currentElementId);
    if (!currentElement) return;
    
    // First create a sorted copy of elements
    const sortedElements = [...elements].sort((a, b) => a.order - b.order);
    
    // Calculate the order for the new element and adjust other elements' orders
    let newOrder: number;

    if (position === 'before') {
      // For 'before', use the current element's order
      newOrder = currentElement.order;
      
      // Shift current element and all elements after it
      for (const el of sortedElements) {
        if (el.order >= newOrder) {
          updateElement(el.id, { order: el.order + 1 });
        }
      }
    } else { // position === 'after'
      // For 'after', use the order immediately after the current element
      newOrder = currentElement.order + 1;
      
      // Shift all elements that come after the current element
      for (const el of sortedElements) {
        if (el.order >= newOrder) {
          updateElement(el.id, { order: el.order + 1 });
        }
      }
    }
    
    // Add the new element with the calculated order
    const newElementId = addElement(type, newOrder);
    
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
