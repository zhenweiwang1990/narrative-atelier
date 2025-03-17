
import React from "react";
import { Scene, Story } from "@/utils/types";
import SceneTitleInput from "./SceneTitleInput";
import SceneTypeSelector from "./SceneTypeSelector";
import LocationSelector from "./LocationSelector";

interface SceneMetadataSectionProps {
  selectedScene: Scene;
  story: Story;
  updateSceneTitle: (newTitle: string) => void;
  updateSceneType: (newType: any) => void;
  updateSceneLocation: (locationId: string) => void;
}

const SceneMetadataSection: React.FC<SceneMetadataSectionProps> = ({
  selectedScene,
  story,
  updateSceneTitle,
  updateSceneType,
  updateSceneLocation,
}) => {
  return (
    <div className="space-y-4">
      <SceneTitleInput 
        title={selectedScene.title} 
        updateSceneTitle={updateSceneTitle} 
      />

      <SceneTypeSelector 
        type={selectedScene.type} 
        updateSceneType={updateSceneType}
      />

      <LocationSelector 
        locationId={selectedScene.locationId} 
        story={story}
        updateSceneLocation={updateSceneLocation}
      />
    </div>
  );
};

export default SceneMetadataSection;
