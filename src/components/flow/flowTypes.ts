
import { Node, Edge } from 'reactflow';
import { SceneElement, SceneType } from '@/utils/types';

export interface SceneNodeData {
  label: string;
  sceneType: SceneType;
  locationName?: string;
  elements?: SceneElement[];
  revivalPointId?: string;
  nextSceneId?: string;
  hasNextScene?: boolean;
}

export interface SceneNode extends Node {
  data: SceneNodeData;
}

export interface SceneEdge extends Edge {
  data?: any;
}
