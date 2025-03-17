
import { SceneType } from "@/utils/types";

// 场景显示的过滤选项
export type SceneFilterOption = 'all' | 'endings' | 'incomplete';

export interface FlowEditorProps {
  onSceneSelect: (sceneId: string) => void;
  onPreviewToggle?: () => void;
  onAddSceneWithType?: (type?: SceneType) => void;
}
