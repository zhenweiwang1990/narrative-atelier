
import { SceneElement } from '@/utils/types';

// Reorder elements
export const reorderElements = (elements: SceneElement[]): SceneElement[] => {
  return elements.map((elem, index) => ({
    ...elem,
    order: index
  }));
};

// Move element up in the order
export const moveElementUp = (elements: SceneElement[], index: number): SceneElement[] => {
  if (index <= 0) return elements;
  
  const newElements = [...elements].sort((a, b) => a.order - b.order);
  
  // Swap order property
  const temp = newElements[index].order;
  newElements[index].order = newElements[index - 1].order;
  newElements[index - 1].order = temp;
  
  // Swap positions in array
  [newElements[index], newElements[index - 1]] = [newElements[index - 1], newElements[index]];
  
  return newElements;
};

// Move element down in the order
export const moveElementDown = (elements: SceneElement[], index: number): SceneElement[] => {
  if (index >= elements.length - 1) return elements;
  
  const newElements = [...elements].sort((a, b) => a.order - b.order);
  
  // Swap order property
  const temp = newElements[index].order;
  newElements[index].order = newElements[index + 1].order;
  newElements[index + 1].order = temp;
  
  // Swap positions in array
  [newElements[index], newElements[index + 1]] = [newElements[index + 1], newElements[index]];
  
  return newElements;
};

// Update an element with new properties
export const updateElement = <T extends SceneElement>(
  elements: SceneElement[],
  id: string, 
  updatedElement: Partial<T>
): SceneElement[] => {
  // Create a new array with the updated element
  const updatedElements = elements.map(elem => {
    if (elem.id === id) {
      return { ...elem, ...updatedElement } as SceneElement;
    }
    return elem;
  });
  
  // If the order property was updated, make sure to re-sort
  if (updatedElement.hasOwnProperty('order')) {
    return updatedElements.sort((a, b) => a.order - b.order);
  }
  
  return updatedElements;
};
