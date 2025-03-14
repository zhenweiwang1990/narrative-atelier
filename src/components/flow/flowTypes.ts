
import { Node, Edge } from 'reactflow';
import { SceneElement } from '@/utils/types';

// Define a type for the scene node data
export interface SceneNodeData {
  label: string;
  sceneType: string;
  locationName: string;
  elements: SceneElement[];
  revivalPointId?: string;
}

// Type for the complete flow state
export interface FlowState {
  nodes: Node<SceneNodeData>[];
  edges: Edge[];
  selectedNode: Node<SceneNodeData> | null;
}
