import { useState, useCallback } from 'react';
import { Scene, SceneType, Story } from '@/utils/types';
import { useStory } from '@/components/Layout';
import { generateId } from '@/utils/storage';

export const useSceneManagement = () => {
  const { story, setStory } = useStory();
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);

  const updateStory = useCallback(
    (updatedStory: Story) => {
      if (setStory) {
        setStory(updatedStory);
      }
    },
    [setStory]
  );

  const updateScene = useCallback(
    (sceneId: string, updates: Partial<Scene>) => {
      if (!story) return;

      const updatedScenes = story.scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, ...updates } : scene
      );

      updateStory({ ...story, scenes: updatedScenes });
    },
    [story, updateStory]
  );

  const deleteScene = useCallback(
    (sceneId: string) => {
      if (!story) return;

      const updatedScenes = story.scenes.filter((scene) => scene.id !== sceneId);

      // Also remove the scene from any location that references it
      const updatedLocations = story.locations.map(location => ({
        ...location,
        scenes: location.scenes.filter(scene => scene !== sceneId),
      }));

      updateStory({ ...story, scenes: updatedScenes, locations: updatedLocations });
      setSelectedSceneId(null);
    },
    [story, updateStory, setSelectedSceneId]
  );

  const createScene = (type: SceneType = 'normal') => {
    const newId = generateId('scene');
    return {
      id: newId,
      title: '新场景',
      type,
      locationId: '',
      elements: [],
      position: { x: 100, y: 100 },
    };
  };

  const addScene = useCallback(
    (newScene: Scene) => {
      if (!story) return;

      const updatedScenes = [...story.scenes, newScene];
      updateStory({ ...story, scenes: updatedScenes });
    },
    [story, updateStory]
  );

  const duplicateScene = useCallback(
    (sceneId: string) => {
      if (!story) return;

      const sceneToDuplicate = story.scenes.find(scene => scene.id === sceneId);

      if (sceneToDuplicate) {
        const newScene = {
          ...sceneToDuplicate,
          id: generateId('scene'),
          title: `${sceneToDuplicate.title} (副本)`,
          position: {
            x: sceneToDuplicate.position.x + 50,
            y: sceneToDuplicate.position.y + 50,
          },
        };

        addScene(newScene);
      }
    },
    [story, addScene]
  );

  return {
    selectedSceneId,
    setSelectedSceneId,
    updateScene,
    deleteScene,
    addScene,
    createScene,
    duplicateScene,
  };
};
