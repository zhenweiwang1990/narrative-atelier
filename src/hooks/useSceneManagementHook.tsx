
import { useState } from 'react';
import { SceneType, Story, Scene } from '@/utils/types';
import { useToast } from '@/components/ui/use-toast';
import { generateId } from '@/utils/storage';

export const useSceneManagementHook = (story: Story | null, setStory: React.Dispatch<React.SetStateAction<Story | null>> | null) => {
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("flow");
  const { toast } = useToast();
  
  const selectedScene = story?.scenes.find(scene => scene.id === selectedSceneId);

  const handleAddScene = () => {
    if (!story || !setStory) return;
    
    const newScene: Scene = {
      id: generateId('scene'),
      title: `New Scene ${story.scenes.length + 1}`,
      type: 'normal',
      locationId: story.locations[0]?.id || '',
      elements: []
    };
    
    setStory({
      ...story,
      scenes: [...story.scenes, newScene]
    });
    
    toast({
      title: "Scene added",
      description: `${newScene.title} has been added to your story.`
    });
    
    setSelectedSceneId(newScene.id);
    setActiveTab("properties");
  };

  const handleSceneSelect = (sceneId: string) => {
    setSelectedSceneId(sceneId);
    setActiveTab("properties");
  };

  const updateSceneTitle = (newTitle: string) => {
    if (!story || !setStory || !selectedSceneId) return;
    
    const updatedScenes = story.scenes.map(scene => {
      if (scene.id === selectedSceneId) {
        return {
          ...scene,
          title: newTitle
        };
      }
      return scene;
    });
    
    setStory({
      ...story,
      scenes: updatedScenes
    });
  };

  const updateSceneType = (newType: SceneType) => {
    if (!story || !setStory || !selectedSceneId) return;
    
    const updatedScenes = story.scenes.map(scene => {
      if (scene.id === selectedSceneId) {
        return {
          ...scene,
          type: newType
        };
      }
      return scene;
    });
    
    setStory({
      ...story,
      scenes: updatedScenes
    });
  };

  const updateSceneLocation = (locationId: string) => {
    if (!story || !setStory || !selectedSceneId) return;
    
    const updatedScenes = story.scenes.map(scene => {
      if (scene.id === selectedSceneId) {
        return {
          ...scene,
          locationId
        };
      }
      return scene;
    });
    
    setStory({
      ...story,
      scenes: updatedScenes
    });
  };

  const updateNextScene = (nextSceneId: string) => {
    if (!story || !setStory || !selectedSceneId) return;
    
    const updatedScenes = story.scenes.map(scene => {
      if (scene.id === selectedSceneId) {
        return {
          ...scene,
          nextSceneId: nextSceneId || undefined
        };
      }
      return scene;
    });
    
    setStory({
      ...story,
      scenes: updatedScenes
    });
  };

  const updateRevivalPoint = (revivalPointId: string) => {
    if (!story || !setStory || !selectedSceneId) return;
    
    const updatedScenes = story.scenes.map(scene => {
      if (scene.id === selectedSceneId) {
        return {
          ...scene,
          revivalPointId: revivalPointId || undefined
        };
      }
      return scene;
    });
    
    setStory({
      ...story,
      scenes: updatedScenes
    });
  };

  return {
    selectedSceneId,
    setSelectedSceneId,
    activeTab,
    setActiveTab,
    selectedScene,
    handleAddScene,
    handleSceneSelect,
    updateSceneTitle,
    updateSceneType,
    updateSceneLocation,
    updateNextScene,
    updateRevivalPoint
  };
};
