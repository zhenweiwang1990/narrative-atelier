
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
  // New props for scene effects and ending name
  updateSceneEntrance?: (effect: string) => void;
  updateSceneEnvironment?: (effect: string) => void;
  updateEndingName?: (name: string) => void;
}
