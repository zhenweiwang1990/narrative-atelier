
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
  
  const newElements = [...elements];
  
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
  
  const newElements = [...elements];
  
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
  return elements.map(elem => {
    if (elem.id === id) {
      return { ...elem, ...updatedElement } as SceneElement;
    }
    return elem;
  });
};
