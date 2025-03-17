
import React from "react";
import { Scene } from "@/utils/types";
import EntranceEffectSelector from "./EntranceEffectSelector";
import EnvironmentEffectSelector from "./EnvironmentEffectSelector";
import BackgroundMusicSelector from "./BackgroundMusicSelector";

interface SceneVisualEffectsSectionProps {
  selectedScene: Scene;
  updateSceneEntrance?: (effect: string) => void;
  updateSceneEnvironment?: (effect: string) => void;
  updateBackgroundMusic?: (music: { id: string; name: string; url: string }) => void;
}

const SceneVisualEffectsSection: React.FC<SceneVisualEffectsSectionProps> = ({
  selectedScene,
  updateSceneEntrance,
  updateSceneEnvironment,
  updateBackgroundMusic
}) => {
  return (
    <div className="space-y-4">
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

export default SceneVisualEffectsSection;
