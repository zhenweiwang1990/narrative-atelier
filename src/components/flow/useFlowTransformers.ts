
import { useCallback, useEffect, useState } from 'react';
import { Node, Edge, useNodesState, useEdgesState } from 'reactflow';
import { Story } from '@/utils/types';
import { scenesToNodes, createEdgesFromStory } from './transformUtils';
import { useNodeInteractions } from './useNodeInteractions';
import { SceneNodeData } from './flowTypes';

export const useFlowTransformers = (
  story: Story | null,
  setStory: React.Dispatch<React.SetStateAction<Story | null>> | null,
  onSceneSelect: (sceneId: string) => void
) => {
  // Fix the generic type parameter
  const [nodes, setNodes, onNodesChange] = useNodesState<SceneNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node<SceneNodeData> | null>(null);

  // Convert scenes to nodes and connections
  useEffect(() => {
    if (!story) return;

    try {
      // Create nodes from scenes
      const flowNodes = scenesToNodes(story);
      
      // Add revivalPointId to node data if it exists in the scene
      const enhancedNodes = flowNodes.map(node => {
        const scene = story.scenes.find(s => s.id === node.id);
        if (scene && scene.revivalPointId) {
          return {
            ...node,
            data: {
              ...node.data,
              revivalPointId: scene.revivalPointId
            }
          };
        }
        return node;
      });
      
      setNodes(enhancedNodes);

      // Create edges from scene connections
      const flowEdges = createEdgesFromStory(story);
      setEdges(flowEdges);
    } catch (error) {
      console.error("Error in useFlowTransformers:", error);
    }
  }, [story, setNodes, setEdges]);

  // Get node interaction handlers
  const { onConnect, onNodeClick } = useNodeInteractions(
    setEdges, 
    setSelectedNode, 
    story, 
    setStory, 
    onSceneSelect
  );

  return {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    setNodes,
    setEdges
  };
};
