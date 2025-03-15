
import { Scene, SceneType, Story } from "@/utils/types";

export interface ScenePropertiesPanelProps {
  selectedScene: Scene;
  story: Story;
  updateSceneTitle: (newTitle: string) => void;
  updateSceneType: (newType: SceneType) => void;
  updateSceneLocation: (locationId: string) => void;
  updateNextScene: (nextSceneId: string) => void;
  updateRevivalPoint?: (sceneId: string) => void;
  selectedSceneId: string;
  // Props for scene effects and ending name
  updateSceneEntrance?: (effect: string) => void;
  updateSceneEnvironment?: (effect: string) => void;
  updateEndingName?: (name: string) => void;
  updateBackgroundMusic?: (music: { url: string; name: string; isUploaded: boolean }) => void;
}
