
import React from "react";
import { Story, Scene } from "@/utils/types";
import ScenePropertiesPanel from "../ScenePropertiesPanel";

interface ScenePropertiesEditorProps {
  sceneId: string;
  selectedScene: Scene;
  story: Story;
  setStory: (story: Story) => void;
}

const ScenePropertiesEditor: React.FC<ScenePropertiesEditorProps> = ({
  sceneId,
  selectedScene,
  story,
  setStory,
}) => {
  if (!selectedScene || !story || !setStory) return null;

  const updateSceneTitle = (newTitle: string) => {
    setStory({
      ...story,
      scenes: story.scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, title: newTitle } : scene
      ),
    });
  };

  const updateSceneType = (newType: any) => {
    setStory({
      ...story,
      scenes: story.scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, type: newType } : scene
      ),
    });
  };

  const updateSceneLocation = (locationId: string) => {
    setStory({
      ...story,
      scenes: story.scenes.map((scene) =>
        scene.id === sceneId ? { ...scene, locationId } : scene
      ),
    });
  };

  const updateNextScene = (nextSceneId: string) => {
    setStory({
      ...story,
      scenes: story.scenes.map((scene) =>
        scene.id === sceneId
          ? { ...scene, nextSceneId: nextSceneId || undefined }
          : scene
      ),
    });
  };

  const updateRevivalPoint = (revivalPointId: string) => {
    setStory({
      ...story,
      scenes: story.scenes.map((scene) =>
        scene.id === sceneId
          ? { ...scene, revivalPointId: revivalPointId || undefined }
          : scene
      ),
    });
  };

  return (
    <ScenePropertiesPanel
      selectedScene={selectedScene}
      story={story}
      updateSceneTitle={updateSceneTitle}
      updateSceneType={updateSceneType}
      updateSceneLocation={updateSceneLocation}
      updateNextScene={updateNextScene}
      updateRevivalPoint={updateRevivalPoint}
      selectedSceneId={sceneId}
    />
  );
};

export default ScenePropertiesEditor;
