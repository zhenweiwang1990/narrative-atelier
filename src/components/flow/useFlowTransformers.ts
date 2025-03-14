
import { useCallback, useEffect, useState } from 'react';
import { 
  Node, 
  Edge, 
  Connection, 
  addEdge, 
  useNodesState, 
  useEdgesState, 
  MarkerType 
} from 'reactflow';
import { Story, Scene, SceneElement } from '@/utils/types';

// Define a type for the node data
interface SceneNodeData {
  label: string;
  sceneType: string;
  locationName: string;
  elements: SceneElement[];
}

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
      const flowNodes = story.scenes.map((scene, index) => {
        const location = story.locations.find(loc => loc.id === scene.locationId);
        
        return {
          id: scene.id,
          type: 'scene',
          data: {
            label: scene.title,
            sceneType: scene.type,
            locationName: location?.name || 'Unknown Location',
            elements: scene.elements
          },
          position: {
            x: (index % 3) * 250,
            y: Math.floor(index / 3) * 180
          }
        } as Node;
      });

      // Set nodes with proper typing
      setNodes(flowNodes);

      // Create edges from scene connections
      const flowEdges: Edge[] = [];
      
      // Linear connections from nextSceneId
      story.scenes.forEach(scene => {
        if (scene.nextSceneId) {
          flowEdges.push({
            id: `e-${scene.id}-${scene.nextSceneId}`,
            source: scene.id,
            target: scene.nextSceneId,
            type: 'smoothstep',
            animated: false,
            label: 'Next',
            markerEnd: {
              type: MarkerType.ArrowClosed
            }
          });
        }
      });

      // Connections from choice elements
      story.scenes.forEach(scene => {
        scene.elements.forEach((element, elemIndex) => {
          if (element.type === 'choice') {
            element.options.forEach((option, optIndex) => {
              if (option.nextSceneId) {
                flowEdges.push({
                  id: `e-${scene.id}-${option.nextSceneId}-choice-${optIndex}`,
                  source: scene.id,
                  target: option.nextSceneId,
                  sourceHandle: `choice-${elemIndex}-${optIndex}`,
                  label: `Choice: ${option.text.substring(0, 15)}${option.text.length > 15 ? '...' : ''}`,
                  type: 'smoothstep',
                  animated: true,
                  style: { stroke: '#f59e0b' }
                });
              }
            });
          } else if (element.type === 'qte') {
            if (element.successSceneId) {
              flowEdges.push({
                id: `e-${scene.id}-${element.successSceneId}-qte-success-${elemIndex}`,
                source: scene.id,
                sourceHandle: `qte-success-${elemIndex}`,
                target: element.successSceneId,
                label: 'Success',
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#10b981' }
              });
            }
            
            if (element.failureSceneId) {
              flowEdges.push({
                id: `e-${scene.id}-${element.failureSceneId}-qte-failure-${elemIndex}`,
                source: scene.id,
                sourceHandle: `qte-failure-${elemIndex}`,
                target: element.failureSceneId,
                label: 'Failure',
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#ef4444' }
              });
            }
          } else if (element.type === 'dialogueTask') {
            if (element.successSceneId) {
              flowEdges.push({
                id: `e-${scene.id}-${element.successSceneId}-dialogueTask-success-${elemIndex}`,
                source: scene.id,
                sourceHandle: `dialogueTask-success-${elemIndex}`,
                target: element.successSceneId,
                label: 'Success',
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#10b981' }
              });
            }
            
            if (element.failureSceneId) {
              flowEdges.push({
                id: `e-${scene.id}-${element.failureSceneId}-dialogueTask-failure-${elemIndex}`,
                source: scene.id,
                sourceHandle: `dialogueTask-failure-${elemIndex}`,
                target: element.failureSceneId,
                label: 'Failure',
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#ef4444' }
              });
            }
          }
        });
      });

      setEdges(flowEdges);
    } catch (error) {
      console.error("Error in useFlowTransformers:", error);
    }
  }, [story, setNodes, setEdges]);

  // Handle connecting nodes
  const onConnect = useCallback(
    (connection: Connection) => {
      if (!story || !setStory) return;
      
      // Add the edge
      setEdges((eds) => addEdge({
        ...connection,
        id: `e-${connection.source}-${connection.target}`,
        type: 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      }, eds));
      
      // Update the story data - set the next scene
      setStory(prevStory => {
        if (!prevStory) return null;
        
        const updatedScenes = prevStory.scenes.map(scene => {
          if (scene.id === connection.source) {
            return {
              ...scene,
              nextSceneId: connection.target as string
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
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    // Call the parent's scene select handler
    onSceneSelect(node.id);
  }, [onSceneSelect]);

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
