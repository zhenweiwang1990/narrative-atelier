
import { Scene, Story, SceneType } from "@/utils/types";

export interface ScenePropertiesPanelProps {
  selectedScene: Scene;
  story: Story;
  selectedSceneId: string | null;
  updateSceneTitle: (title: string) => void;
  updateSceneType: (type: SceneType) => void;
  updateSceneLocation: (locationId: string) => void;
  updateNextScene: (nextSceneId: string) => void;
  updateRevivalPoint: (revivalPointId: string) => void;
  updateSceneEntrance?: (effect: string) => void;
  updateSceneEnvironment?: (effect: string) => void;
  updateEndingName?: (name: string) => void;
  updateEndingPoster?: (url: string) => void; // Ensure this property is defined
  updateBackgroundMusic?: (music: { id: string; name: string; url: string }) => void;
  updateSceneUnlockPrice?: (price: number | undefined) => void;
}
