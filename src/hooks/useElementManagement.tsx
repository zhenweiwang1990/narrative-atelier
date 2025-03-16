
import { useState, useEffect } from 'react';
import { 
  SceneElement, 
  ElementType, 
  ChoiceElement, 
  ChoiceOption,
  Story
} from '@/utils/types';
import { 
  createNewElement,
  addOptionToChoice,
  deleteOptionFromChoice,
  updateOptionInChoice,
  validateTimeLimit,
  validateKeySequence,
  moveElementUp as moveElementUpUtil,
  moveElementDown as moveElementDownUtil,
  updateElement as updateElementUtil
} from './element-utils';
import { useElementsState } from './useElementsState';
import { useElementUpdater } from './useElementUpdater';

export const useElementManagement = (
  sceneId: string,
  story: Story | null,
  setStory: React.Dispatch<React.SetStateAction<Story | null>> | null
) => {
  // Use custom hooks for state management and element update operations
  const { elements, setElements } = useElementsState(sceneId, story);
  const { updateStory } = useElementUpdater(sceneId, story, setStory);

  // Add new element with optional specific position index
  const addElement = (type: ElementType, position?: number) => {
    if (!story) return null;
    
    // Create new element without order field
    const newElement = createNewElement(type, story) as SceneElement;
    
    let updatedElements;
    
    if (position !== undefined) {
      // Insert at specific position
      updatedElements = [
        ...elements.slice(0, position),
        newElement,
        ...elements.slice(position)
      ];
    } else {
      // Add at the end
      updatedElements = [...elements, newElement];
    }
    
    // Call updateStory immediately to ensure the story state is updated
    updateStory(updatedElements);
    
    // Update our local state after
    setElements(updatedElements);
    
    return newElement.id;
  };

  // Delete element
  const deleteElement = (id: string) => {
    const updatedElements = elements.filter(e => e.id !== id);
    
    // Update story first
    updateStory(updatedElements);
    
    // Then update local state
    setElements(updatedElements);
    
    return id;
  };

  // Reorder elements using drag and drop
  const reorderElements = (sourceIndex: number, destinationIndex: number) => {
    if (sourceIndex === destinationIndex) return;
    
    const result = Array.from(elements);
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed);
    
    // Update story first
    updateStory(result);
    
    // Then update local state
    setElements(result);
  };

  // Move element up (swap with previous element)
  const moveElementUp = (id: string) => {
    const index = elements.findIndex(e => e.id === id);
    if (index <= 0) return;
    
    const updatedElements = moveElementUpUtil(elements, index);
    
    // Update story first
    updateStory(updatedElements);
    
    // Then update local state
    setElements(updatedElements);
  };

  // Move element down (swap with next element)
  const moveElementDown = (id: string) => {
    const index = elements.findIndex(e => e.id === id);
    if (index >= elements.length - 1) return;
    
    const updatedElements = moveElementDownUtil(elements, index);
    
    // Update story first
    updateStory(updatedElements);
    
    // Then update local state
    setElements(updatedElements);
  };

  // Update element
  const updateElement = (id: string, updatedElement: Partial<SceneElement>) => {
    const newElements = updateElementUtil(elements, id, updatedElement);
    
    // Update story first to ensure consistency
    updateStory([...newElements] as SceneElement[]);
    
    // Then update our local state
    setElements([...newElements] as SceneElement[]);
  };

  // Add choice option
  const addChoiceOption = (elementId: string) => {
    const element = elements.find(e => e.id === elementId) as ChoiceElement;
    if (!element || element.type !== 'choice') return;
    
    const updatedElement = addOptionToChoice(element);
    updateElement(elementId, updatedElement);
  };

  // Delete choice option
  const deleteChoiceOption = (elementId: string, optionId: string) => {
    const element = elements.find(e => e.id === elementId) as ChoiceElement;
    if (!element || element.type !== 'choice') return;
    
    const updatedElement = deleteOptionFromChoice(element, optionId);
    updateElement(elementId, updatedElement);
  };

  // Update choice option
  const updateChoiceOption = (elementId: string, optionId: string, updates: Partial<ChoiceOption>) => {
    const element = elements.find(e => e.id === elementId) as ChoiceElement;
    if (!element || element.type !== 'choice') return;
    
    const updatedElement = updateOptionInChoice(element, optionId, updates);
    updateElement(elementId, updatedElement);
  };

  return {
    elements,
    addElement,
    deleteElement,
    reorderElements,
    moveElementUp,
    moveElementDown,
    updateElement,
    addChoiceOption,
    deleteChoiceOption,
    updateChoiceOption,
    validateTimeLimit,
    validateKeySequence
  };
};
