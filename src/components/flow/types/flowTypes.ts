
import { SceneType } from "@/types";

// Filter options for scene display
export type SceneFilterOption = 'all' | 'endings' | 'incomplete';

export interface FlowEditorProps {
  onSceneSelect: (sceneId: string) => void;
  onPreviewToggle?: () => void;
  onAddSceneWithType?: (type?: SceneType) => void;
}
