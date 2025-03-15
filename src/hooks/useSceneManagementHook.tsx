import React, { useState, useEffect } from "react";
import { generateId } from "@/utils/storage";
import { useStory } from "@/contexts/StoryContext";
import { Scene, SceneType, Story } from "@/utils/types";

export interface UseSceneManagementHook {
  selectedScene: Scene | undefined;
  selectScene: (sceneId: string) => void;
  createScene: (type?: SceneType) => void;
  updateScene: (id: string, updates: Partial<Scene>) => void;
  deleteScene: (id: string) => void;
  selectedSceneId: string | null;
  setSelectedSceneId: (id: string | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleAddScene: (type: SceneType) => void;
  handleSceneSelect: (id: string) => void;
  updateSceneTitle: (id: string, title: string) => void;
  updateSceneType: (id: string, type: SceneType) => void;
  updateSceneLocation: (id: string, locationId: string) => void;
  updateNextScene: (id: string, nextSceneId: string | undefined) => void;
  updateRevivalPoint: (id: string, revivalPointId: string | undefined) => void;
}

export const useSceneManagementHook = (
  story: Story | null,
  setStory: React.Dispatch<React.SetStateAction<Story | null>> | null
): UseSceneManagementHook => {
  const { selectedLocation } = useStory() as { selectedLocation?: { id: string } };
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('properties');

  const selectedScene = story?.scenes.find(scene => scene.id === selectedSceneId);

  const selectScene = (sceneId: string) => {
    setSelectedSceneId(sceneId);
  };

  const handleSceneSelect = selectScene;

  const createScene = (type: SceneType = 'normal'): Scene => {
    const newId = generateId('scene');
    return {
      id: newId,
      title: '新场景',
      type: type,
      locationId: selectedLocation?.id || '',
      elements: [],
      position: { x: 100, y: 100 },
    };
  };

  const handleAddScene = (type: SceneType = 'normal') => {
    if (!story || !setStory) return;
    
    const newScene = createScene(type);
    const updatedScenes = [...story.scenes, newScene];
    
    setStory({
      ...story,
      scenes: updatedScenes
    });
    
    setSelectedSceneId(newScene.id);
  };

  const updateScene = (id: string, updates: Partial<Scene>) => {
    if (!story || !setStory) return;

    const updatedScenes = story.scenes.map(scene =>
      scene.id === id ? { ...scene, ...updates } : scene
    );

    setStory({ ...story, scenes: updatedScenes });
  };

  const updateSceneTitle = (id: string, title: string) => {
    updateScene(id, { title });
  };

  const updateSceneType = (id: string, type: SceneType) => {
    updateScene(id, { type });
  };

  const updateSceneLocation = (id: string, locationId: string) => {
    updateScene(id, { locationId });
  };

  const updateNextScene = (id: string, nextSceneId: string | undefined) => {
    updateScene(id, { nextSceneId });
  };

  const updateRevivalPoint = (id: string, revivalPointId: string | undefined) => {
    updateScene(id, { revivalPointId });
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
    selectedSceneId,
    setSelectedSceneId,
    activeTab,
    setActiveTab,
    handleAddScene,
    handleSceneSelect,
    updateSceneTitle,
    updateSceneType,
    updateSceneLocation,
    updateNextScene,
    updateRevivalPoint
  };
};
