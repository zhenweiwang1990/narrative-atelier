
import { useCallback, useEffect } from 'react';
import { Node, Edge, Connection, addEdge } from 'reactflow';
import { useNodesState, useEdgesState } from 'reactflow';
import { Story, Scene, FlowNode, FlowEdge } from '@/utils/types';

export const useFlowTransformers = (
  story: Story | null,
  setStory: React.Dispatch<React.SetStateAction<Story | null>> | null,
  onSceneSelect: (sceneId: string) => void
) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Convert scenes to nodes and connections
  useEffect(() => {
    if (!story) return;

    // Create nodes from scenes
    const flowNodes: FlowNode[] = story.scenes.map((scene, index) => ({
      id: scene.id,
      type: 'scene',
      data: {
        label: scene.title,
        sceneType: scene.type
      },
      position: {
        x: (index % 4) * 250,
        y: Math.floor(index / 4) * 150
      }
    }));

    setNodes(flowNodes);

    // Create edges from scene connections
    const flowEdges: FlowEdge[] = [];
    
    // Linear connections from nextSceneId
    story.scenes.forEach(scene => {
      if (scene.nextSceneId) {
        flowEdges.push({
          id: `e-${scene.id}-${scene.nextSceneId}`,
          source: scene.id,
          target: scene.nextSceneId,
          type: 'smoothstep',
          label: 'Next'
        });
      }
    });

    // Connections from choice elements
    story.scenes.forEach(scene => {
      scene.elements.forEach(element => {
        if (element.type === 'choice') {
          element.options.forEach(option => {
            flowEdges.push({
              id: `e-${scene.id}-${option.nextSceneId}-${option.id}`,
              source: scene.id,
              target: option.nextSceneId,
              label: `Choice: ${option.text.substring(0, 20)}${option.text.length > 20 ? '...' : ''}`,
              type: 'smoothstep'
            });
          });
        } else if (element.type === 'qte' || element.type === 'dialogueTask') {
          // Add edges for QTE and DialogueTask success/failure
          flowEdges.push({
            id: `e-${scene.id}-${element.successSceneId}-success`,
            source: scene.id,
            target: element.successSceneId,
            label: 'Success',
            type: 'smoothstep'
          });
          
          flowEdges.push({
            id: `e-${scene.id}-${element.failureSceneId}-failure`,
            source: scene.id,
            target: element.failureSceneId,
            label: 'Failure',
            type: 'smoothstep'
          });
        }
      });
    });

    setEdges(flowEdges);
  }, [story, setNodes, setEdges]);

  // Handle connecting nodes
  const onConnect = useCallback(
    (connection: Connection) => {
      if (!story || !setStory) return;
      
      // Add the edge
      setEdges((eds) => addEdge({
        ...connection,
        id: `e-${connection.source}-${connection.target}`,
        type: 'smoothstep'
      }, eds));
      
      // Update the story data - set the next scene
      setStory(prevStory => {
        if (!prevStory) return null;
        
        const updatedScenes = prevStory.scenes.map(scene => {
          if (scene.id === connection.source) {
            return {
              ...scene,
              nextSceneId: connection.target
            };
          }
          return scene;
        });
        
        return {
          ...prevStory,
          scenes: updatedScenes
        };
      });
    },
    [setEdges, story, setStory]
  );

  // Handle node selection
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    // Call the parent's scene select handler
    onSceneSelect(node.id);
  };

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

// Fix missing import
import { useState } from 'react';
