import { useState } from 'react';
import { Scene, SceneType, Story } from '@/utils/types';
import { useStory } from '@/components/Layout';

interface UseSceneManagementHook {
  selectedScene: Scene | undefined;
  selectScene: (sceneId: string) => void;
  createScene: (type?: SceneType) => void;
  updateScene: (id: string, updates: Partial<Scene>) => void;
  deleteScene: (id: string) => void;
}

export const useSceneManagementHook = (): UseSceneManagementHook => {
  const { story, setStory, selectedLocation } = useStory();
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);

  const selectedScene = story?.scenes.find(scene => scene.id === selectedSceneId);

  const selectScene = (sceneId: string) => {
    setSelectedSceneId(sceneId);
  };

  const createScene = (type: SceneType = 'normal'): Scene => {
    const newId = `scene_${Date.now()}`;
    return {
      id: newId,
      title: '新场景',
      type: type,
      locationId: selectedLocation?.id || '',
      elements: [],
      position: { x: 100, y: 100 }, // Added required position property
    };
  };

  const updateScene = (id: string, updates: Partial<Scene>) => {
    if (!story || !setStory) return;

    const updatedScenes = story.scenes.map(scene =>
      scene.id === id ? { ...scene, ...updates } : scene
    );

    setStory({ ...story, scenes: updatedScenes });
  };

  const deleteScene = (id: string) => {
    if (!story || !setStory) return;

    const updatedScenes = story.scenes.filter(scene => scene.id !== id);

    setStory({ ...story, scenes: updatedScenes });
  };

  return {
    selectedScene,
    selectScene,
    createScene,
    updateScene,
    deleteScene,
  };
};
