
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
  reorderElements as reorderElementsUtil,
  updateElement as updateElementUtil
} from './element-utils';

export const useElementManagement = (
  sceneId: string,
  story: Story | null,
  setStory: React.Dispatch<React.SetStateAction<Story | null>> | null
) => {
  const [elements, setElements] = useState<SceneElement[]>([]);
  
  // Get current scene and its elements
  useEffect(() => {
    if (!story) return;
    
    const currentScene = story.scenes.find(scene => scene.id === sceneId);
    if (currentScene) {
      // Sort elements by order
      const sortedElements = [...currentScene.elements].sort((a, b) => a.order - b.order);
      setElements(sortedElements);
    }
  }, [story, sceneId]);

  // Update story when elements change
  const updateStory = (updatedElements: SceneElement[]) => {
    if (!story || !setStory) return;
    
    // Sort by order before saving
    const sortedElements = [...updatedElements].sort((a, b) => a.order - b.order);
    
    const updatedScenes = story.scenes.map(scene => {
      if (scene.id === sceneId) {
        return {
          ...scene,
          elements: sortedElements
        };
      }
      return scene;
    });
    
    setStory({
      ...story,
      scenes: updatedScenes
    });
  };

  // Add new element
  const addElement = (type: ElementType) => {
    if (!story) return;
    
    const newElement = createNewElement(type, story, elements.length);
    
    const updatedElements = [...elements, newElement];
    setElements(updatedElements as SceneElement[]);
    updateStory(updatedElements as SceneElement[]);
    
    return newElement.id;
  };

  // Delete element
  const deleteElement = (id: string) => {
    const updatedElements = elements.filter(e => e.id !== id);
    // Reorder remaining elements
    const reorderedElements = reorderElementsUtil(updatedElements);
    
    setElements(reorderedElements);
    updateStory(reorderedElements);
    
    return id;
  };

  // Reorder elements using drag and drop
  const reorderElements = (sourceIndex: number, destinationIndex: number) => {
    const result = Array.from(elements);
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed);
    
    // Update order properties
    const reorderedElements = result.map((element, index) => ({
      ...element,
      order: index
    }));
    
    setElements(reorderedElements);
    updateStory(reorderedElements);
  };

  // Update element
  const updateElement = (id: string, updatedElement: Partial<SceneElement>) => {
    const newElements = updateElementUtil(elements, id, updatedElement);
    setElements([...newElements] as SceneElement[]);
    updateStory([...newElements] as SceneElement[]);
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
    updateElement,
    addChoiceOption,
    deleteChoiceOption,
    updateChoiceOption,
    validateTimeLimit,
    validateKeySequence
  };
};
