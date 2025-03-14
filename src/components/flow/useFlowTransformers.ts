
import { useCallback, useEffect, useState } from 'react';
import { Node, Edge, useNodesState, useEdgesState } from 'reactflow';
import { Story } from '@/utils/types';
import { scenesToNodes, createEdgesFromStory } from './transformUtils';
import { useNodeInteractions } from './useNodeInteractions';

export const useFlowTransformers = (
  story: Story | null,
  setStory: React.Dispatch<React.SetStateAction<Story | null>> | null,
  onSceneSelect: (sceneId: string) => void
) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Convert scenes to nodes and connections
  useEffect(() => {
    if (!story) return;

    try {
      // Create nodes from scenes
      const flowNodes = scenesToNodes(story);
      setNodes(flowNodes as Node[]);

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
