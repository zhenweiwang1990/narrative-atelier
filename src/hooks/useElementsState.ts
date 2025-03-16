
import { useState, useEffect } from 'react';
import { SceneElement, Story } from '@/utils/types';

export const useElementsState = (sceneId: string, story: Story | null) => {
  const [elements, setElements] = useState<SceneElement[]>([]);
  
  // Get current scene and its elements
  useEffect(() => {
    if (!story) return;
    
    const currentScene = story.scenes.find(scene => scene.id === sceneId);
    if (currentScene) {
      // No longer need to sort by order, just use array as is
      setElements([...currentScene.elements]);
    }
  }, [story, sceneId]);
  
  return { elements, setElements };
};
