
import { useCallback } from 'react';
import { Node } from 'reactflow';
import { Story, Scene, SceneType } from '@/utils/types';
import { generateId } from '@/utils/storage';
import { SceneNodeData } from './flowTypes';

export const useSceneManagement = (
  story: Story | null,
  setStory: React.Dispatch<React.SetStateAction<Story | null>> | null,
  nodes: Node<SceneNodeData>[],
  setNodes: React.Dispatch<React.SetStateAction<Node<SceneNodeData>[]>>,
  setEdges: React.Dispatch<React.SetStateAction<any[]>>,
  selectedNode: Node<SceneNodeData> | null,
  setSelectedNode: React.Dispatch<React.SetStateAction<Node<SceneNodeData> | null>>,
  onSceneSelect: (sceneId: string) => void
) => {
  // Add a new scene
  const addScene = useCallback((type: SceneType = 'normal') => {
    if (!story || !setStory) return;
    
    const newSceneId = generateId('scene');
    const nodeCount = nodes.length;
    
    // Create a new scene with the specified type
    const newScene: Scene = {
      id: newSceneId,
      title: type === 'normal' ? 
        `New Scene ${nodeCount + 1}` : 
        type === 'ending' ? 
          `Normal Ending ${story.scenes.filter(s => s.type === 'ending').length + 1}` :
          `Bad Ending ${story.scenes.filter(s => s.type === 'bad-ending').length + 1}`,
      type: type,
      locationId: story.locations[0]?.id || '',
      elements: [],
      position: { // Add the required position property
        x: (nodeCount % 3) * 250,
        y: Math.floor(nodeCount / 3) * 180
      }
    };
    
    // Add to story
    setStory({
      ...story,
      scenes: [...story.scenes, newScene]
    });
    
    // Find location name
    const locationName = story.locations.find(loc => loc.id === newScene.locationId)?.name || 'Unknown Location';
    
    // Add to flow
    const newNode = {
      id: newSceneId,
      type: 'scene',
      data: {
        label: newScene.title,
        sceneType: newScene.type,
        locationName: locationName,
        elements: []
      },
      position: {
        x: (nodeCount % 3) * 250,
        y: Math.floor(nodeCount / 3) * 180
      }
    } as Node<SceneNodeData>;
    
    setNodes(nodes => [...nodes, newNode]);
    setSelectedNode(newNode);
    onSceneSelect(newSceneId);
  }, [story, setStory, nodes, setNodes, setSelectedNode, onSceneSelect]);

  // Delete selected scene
  const deleteSelectedScene = useCallback(() => {
    if (!selectedNode || !story || !setStory) return;
    
    // Remove from story
    setStory({
      ...story,
      scenes: story.scenes.filter(scene => scene.id !== selectedNode.id)
    });
    
    // Remove from flow
    setNodes(nodes => nodes.filter(node => node.id !== selectedNode.id));
    setEdges(edges => edges.filter(edge => 
      edge.source !== selectedNode.id && edge.target !== selectedNode.id
    ));
    
    setSelectedNode(null);
  }, [selectedNode, story, setStory, setNodes, setEdges, setSelectedNode]);

  return {
    addScene,
    deleteSelectedScene
  };
};
