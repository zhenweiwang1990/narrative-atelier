
import { useCallback } from 'react';
import { Node, Edge, Connection, addEdge, MarkerType } from 'reactflow';
import { Story, Scene } from '@/utils/types';
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
      
      // Determine if this is a revival connection
      const sourceScene = story.scenes.find(scene => scene.id === connection.source);
      const isRevivalConnection = sourceScene?.type === 'bad-ending';
      
      // Add the edge with appropriate styling
      setEdges((eds) => addEdge({
        ...connection,
        id: `e-${connection.source}-${connection.target}`,
        type: 'smoothstep',
        animated: isRevivalConnection,
        style: isRevivalConnection 
          ? { stroke: '#d32f2f', strokeWidth: 2, strokeDasharray: '5,5' }
          : { stroke: '#888' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isRevivalConnection ? '#d32f2f' : undefined
        }
      }, eds));
      
      // Update the story data based on connection type
      setStory(prevStory => {
        if (!prevStory) return null;
        
        const updatedScenes = prevStory.scenes.map(scene => {
          if (scene.id === connection.source) {
            if (isRevivalConnection) {
              // For bad-ending scenes, set revival point
              return {
                ...scene,
                revivalPointId: connection.target as string
              };
            } else {
              // For regular scenes, set next scene
              return {
                ...scene,
                nextSceneId: connection.target as string
              };
            }
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
