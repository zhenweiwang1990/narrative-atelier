
import { useState, useEffect } from 'react';
import { Scene, Character, SceneElement, Story } from '@/utils/types';

export const usePreviewState = (sceneId: string, story: Story, onSceneChange: (sceneId: string) => void) => {
  const [currentElementIndex, setCurrentElementIndex] = useState<number>(-1);
  
  useEffect(() => {
    // Reset state when scene changes
    setCurrentElementIndex(-1);
  }, [sceneId]);
  
  const scene = story.scenes.find(s => s.id === sceneId);
  
  if (!scene) {
    return {
      scene: null,
      location: null,
      currentElement: null,
      currentElementIndex: -1,
      isLastElement: false,
      isSceneEnding: false,
      sortedElements: [],
      handleNext: () => {},
      handleChoiceSelect: () => {},
      handleRevival: () => {},
      getCharacter: () => undefined
    };
  }
  
  const location = story.locations.find(l => l.id === scene.locationId);
  const sortedElements = [...scene.elements].sort((a, b) => a.order - b.order);
  const currentElement = currentElementIndex >= 0 && currentElementIndex < sortedElements.length 
    ? sortedElements[currentElementIndex] 
    : null;

  const isLastElement = currentElementIndex === sortedElements.length - 1;
  const isSceneEnding = isLastElement && currentElement && !hasNextAction(currentElement);
  
  // Check if the element has next actions (choices, QTE, dialogueTask)
  function hasNextAction(element: SceneElement): boolean {
    return ['choice', 'qte', 'dialogueTask'].includes(element.type);
  }

  const handleNext = () => {
    if (currentElementIndex < sortedElements.length - 1) {
      setCurrentElementIndex(currentElementIndex + 1);
    } else if (scene.nextSceneId) {
      // Move to next scene
      onSceneChange(scene.nextSceneId);
      setCurrentElementIndex(-1);
    }
  };

  const handleChoiceSelect = (nextSceneId: string) => {
    if (nextSceneId) {
      onSceneChange(nextSceneId);
      setCurrentElementIndex(-1);
    }
  };

  const handleRevival = () => {
    if (scene.revivalPointId) {
      onSceneChange(scene.revivalPointId);
      setCurrentElementIndex(-1);
    }
  };

  // Get character for dialogue/thought
  const getCharacter = (characterId: string): Character | undefined => {
    return story.characters.find(c => c.id === characterId);
  };
  
  return {
    scene,
    location,
    currentElement,
    currentElementIndex,
    isLastElement,
    isSceneEnding,
    sortedElements,
    handleNext,
    handleChoiceSelect,
    handleRevival,
    getCharacter
  };
};
