
import { useCallback } from 'react';
import { Node, Edge, Connection, addEdge, MarkerType } from 'reactflow';
import { Story } from '@/utils/types';
import { SceneNodeData } from './flowTypes';

export const useNodeInteractions = (
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  setSelectedNode: React.Dispatch<React.SetStateAction<Node<SceneNodeData> | null>>,
  story: Story | null,
  setStory: React.Dispatch<React.SetStateAction<Story | null>> | null,
  onSceneSelect: (sceneId: string) => void
) => {
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
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node<SceneNodeData>) => {
    setSelectedNode(node);
    // Call the parent's scene select handler
    onSceneSelect(node.id);
  }, [onSceneSelect, setSelectedNode]);

  return {
    onConnect,
    onNodeClick
  };
};
