
import { SceneElement } from '@/utils/types';

// No need for reordering elements anymore since we use array indices
// Instead, we provide a function that returns a new array to ensure we don't mutate the original

// Move element up in the array
export const moveElementUp = (elements: SceneElement[], index: number): SceneElement[] => {
  if (index <= 0) return elements;
  
  const newElements = [...elements];
  
  // Swap positions in array
  [newElements[index], newElements[index - 1]] = [newElements[index - 1], newElements[index]];
  
  return newElements;
};

// Move element down in the array
export const moveElementDown = (elements: SceneElement[], index: number): SceneElement[] => {
  if (index >= elements.length - 1) return elements;
  
  const newElements = [...elements];
  
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
  return elements.map(elem => {
    if (elem.id === id) {
      return { ...elem, ...updatedElement } as SceneElement;
    }
    return elem;
  });
};
