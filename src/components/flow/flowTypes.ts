
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

// Define SceneNode type properly, using the generic Node type from reactflow
export type SceneNode = Node<SceneNodeData>;

// Define SceneEdge type properly
export type SceneEdge = Edge<any>;
