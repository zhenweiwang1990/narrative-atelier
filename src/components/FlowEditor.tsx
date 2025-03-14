
import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  Node, 
  Edge, 
  Connection, 
  addEdge, 
  Panel,
  useNodesState, 
  useEdgesState, 
  NodeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useStory } from './Layout';
import { generateId } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Scene, FlowNode, FlowEdge } from '@/utils/types';
import { cn } from '@/lib/utils';

// Custom Node Types
const SceneNode = ({ data, selected }: { data: any, selected: boolean }) => {
  const getNodeStyles = () => {
    switch (data.sceneType) {
      case 'start':
        return 'border-green-500 bg-green-50';
      case 'ending':
        return 'border-blue-500 bg-blue-50';
      case 'bad-ending':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <div className={cn(
      'px-4 py-2 rounded-md border shadow-sm',
      getNodeStyles(),
      selected && 'ring-2 ring-primary'
    )}>
      <div className="font-medium">{data.label}</div>
      <div className="text-xs text-muted-foreground capitalize">{data.sceneType}</div>
    </div>
  );
};

const nodeTypes: NodeTypes = {
  scene: SceneNode
};

interface FlowEditorProps {
  onSceneSelect: (sceneId: string) => void;
}

const FlowEditor = ({ onSceneSelect }: FlowEditorProps) => {
  const { story, setStory } = useStory();
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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

  // Add a new scene
  const addScene = () => {
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
  };

  // Delete selected scene
  const deleteSelectedScene = () => {
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
  };

  return (
    <div className="w-full h-[70vh] border rounded-lg bg-white shadow-sm">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
        
        <Panel position="top-right" className="bg-white p-2 rounded-md shadow-sm border">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center text-xs"
              onClick={addScene}
            >
              <Plus className="h-3 w-3 mr-1" /> Add Scene
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center text-xs"
              onClick={deleteSelectedScene}
              disabled={!selectedNode}
            >
              <Trash2 className="h-3 w-3 mr-1 text-destructive" /> Delete
            </Button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
