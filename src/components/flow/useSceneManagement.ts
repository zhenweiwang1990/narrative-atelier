
import { useCallback } from 'react';
import { Node } from 'reactflow';
import { Story, Scene, FlowNode } from '@/utils/types';
import { generateId } from '@/utils/storage';

export const useSceneManagement = (
  story: Story | null,
  setStory: React.Dispatch<React.SetStateAction<Story | null>> | null,
  nodes: FlowNode[],
  setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>,
  setEdges: React.Dispatch<React.SetStateAction<any[]>>,
  selectedNode: Node | null,
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | null>>,
  onSceneSelect: (sceneId: string) => void
) => {
  // Add a new scene
  const addScene = useCallback(() => {
    if (!story || !setStory) return;
    
    const newSceneId = generateId('scene');
    const nodeCount = nodes.length;
    
    // Create a new scene
    const newScene: Scene = {
      id: newSceneId,
      title: `New Scene ${nodeCount + 1}`,
      type: 'normal',
      locationId: story.locations[0]?.id || '',
      elements: []
    };
    
    // Add to story
    setStory({
      ...story,
      scenes: [...story.scenes, newScene]
    });
    
    // Add to flow
    const newNode: FlowNode = {
      id: newSceneId,
      type: 'scene',
      data: {
        label: newScene.title,
        sceneType: newScene.type
      },
      position: {
        x: (nodeCount % 4) * 250,
        y: Math.floor(nodeCount / 4) * 150
      }
    };
    
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
