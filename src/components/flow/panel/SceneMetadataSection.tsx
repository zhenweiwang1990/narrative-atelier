
import React from "react";
import { Scene, Story } from "@/utils/types";
import SceneTitleInput from "./SceneTitleInput";
import SceneTypeSelector from "./SceneTypeSelector";
import LocationSelector from "./LocationSelector";
import EntranceEffectSelector from "./EntranceEffectSelector";
import EnvironmentEffectSelector from "./EnvironmentEffectSelector";
import BackgroundMusicSelector from "./BackgroundMusicSelector";

interface SceneMetadataSectionProps {
  selectedScene: Scene;
  story: Story;
  updateSceneTitle: (newTitle: string) => void;
  updateSceneType: (newType: any) => void;
  updateSceneLocation: (locationId: string) => void;
  updateSceneEntrance?: (effect: string) => void;
  updateSceneEnvironment?: (effect: string) => void;
  updateBackgroundMusic?: (music: { url: string; name: string; isUploaded: boolean }) => void;
}

const SceneMetadataSection: React.FC<SceneMetadataSectionProps> = ({
  selectedScene,
  story,
  updateSceneTitle,
  updateSceneType,
  updateSceneLocation,
  updateSceneEntrance,
  updateSceneEnvironment,
  updateBackgroundMusic
}) => {
  return (
    <div className="space-y-3">
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

      {updateSceneEntrance && (
        <EntranceEffectSelector
          effect={selectedScene.entranceEffect || "fade"}
          updateEffect={updateSceneEntrance}
        />
      )}

      {updateSceneEnvironment && (
        <EnvironmentEffectSelector
          effect={selectedScene.environmentEffect || "none"}
          updateEffect={updateSceneEnvironment}
        />
      )}

      {updateBackgroundMusic && (
        <BackgroundMusicSelector
          backgroundMusic={selectedScene.backgroundMusic}
          updateBackgroundMusic={updateBackgroundMusic}
        />
      )}
    </div>
  );
};

export default SceneMetadataSection;
