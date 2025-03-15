import { useMemo } from 'react';
import { useEdges, useNodes } from 'reactflow';
import { Node, Edge } from 'reactflow';
import { Scene, SceneType } from '@/utils/types';

interface FlowTransformers {
  transformScenesToNodes: () => Node[];
  transformScenesToEdges: () => Edge[];
  getNodesAndEdges: () => { nodes: Node[]; edges: Edge[] };
}

export function useFlowTransformers(scenes: Scene[]) {
  // Transform scenes into nodes (scene cards)
  const transformScenesToNodes = () => {
    if (!scenes) return [];
    
    return scenes.map((scene) => {
      // Find the location
      const hasNextScene = !!scene.nextSceneId;
      
      // For bad-ending scenes, get the revival point name
      let revivalPointName;
      if (scene.type === 'bad-ending' && scene.revivalPointId) {
        const revivalPoint = scenes.find(s => s.id === scene.revivalPointId);
        revivalPointName = revivalPoint?.title || '';
      }
      
      return {
        id: scene.id,
        type: 'sceneNode',
        position: scene.position || { x: 0, y: 0 },
        data: {
          label: scene.title,
          sceneType: scene.type,
          locationName: scene.locationName,
          elements: scene.elements,
          revivalPointId: scene.revivalPointId,
          revivalPointName: revivalPointName,
          nextSceneId: scene.nextSceneId,
          hasNextScene,
        },
      };
    });
  };

  // Transform scenes into edges (arrows)
  const transformScenesToEdges = () => {
    if (!scenes) return [];
    
    return scenes.reduce((edges: Edge[], scene) => {
      if (scene.nextSceneId) {
        edges.push({
          id: `edge-${scene.id}-${scene.nextSceneId}`,
          source: scene.id,
          target: scene.nextSceneId,
          type: 'smoothstep',
          animated: true,
        });
      }
      return edges;
    }, []);
  };

  const getNodesAndEdges = () => {
    const nodes = transformScenesToNodes();
    const edges = transformScenesToEdges();
    return { nodes, edges };
  };

  return {
    transformScenesToNodes,
    transformScenesToEdges,
    getNodesAndEdges,
  };
}
