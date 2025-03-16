
import { SceneElement, Story } from '@/utils/types';

export const useElementUpdater = (
  sceneId: string,
  story: Story | null,
  setStory: React.Dispatch<React.SetStateAction<Story | null>> | null
) => {
  // Update story when elements change
  const updateStory = (updatedElements: SceneElement[]) => {
    if (!story || !setStory) return;
    
    const updatedScenes = story.scenes.map(scene => {
      if (scene.id === sceneId) {
        return {
          ...scene,
          elements: updatedElements
        };
      }
      return scene;
    });
    
    setStory({
      ...story,
      scenes: updatedScenes
    });
  };
  
  return { updateStory };
};
