
import React from 'react';
import { NodeTypes } from 'reactflow';
import 'reactflow/dist/style.css';
import { useStory } from '../Layout';
import SceneNode from './SceneNode';
import { useFlowTransformers } from './useFlowTransformers';
import { useSceneManagement } from './useSceneManagement';
import FlowCanvas from './FlowCanvas';
import FlowEmptyState from './FlowEmptyState';
import FlowLoadingState from './FlowLoadingState';

// Custom Node Types
const nodeTypes: NodeTypes = {
  scene: SceneNode
};

interface FlowEditorProps {
  onSceneSelect: (sceneId: string) => void;
  onPreviewToggle?: () => void;
}

const FlowEditor = ({ onSceneSelect, onPreviewToggle }: FlowEditorProps) => {
  const { story, setStory } = useStory();
  
  // Return early if there's no story
  if (!story) {
    return <FlowLoadingState />;
  }
  
  const {
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
  } = useFlowTransformers(story, setStory, onSceneSelect);

  const {
    addScene,
    deleteSelectedScene
  } = useSceneManagement(
    story, 
    setStory, 
    nodes, 
    setNodes, 
    setEdges, 
    selectedNode, 
    setSelectedNode, 
    onSceneSelect
  );

  // Make sure we have nodes before rendering ReactFlow
  if (!nodes || nodes.length === 0) {
    return <FlowEmptyState />;
  }

  return (
    <div className="w-full h-full border rounded-lg bg-white shadow-sm overflow-hidden">
      <FlowCanvas
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        selectedNode={selectedNode}
        onAddScene={addScene}
        onDeleteScene={deleteSelectedScene}
        onPreviewToggle={onPreviewToggle}
      />
    </div>
  );
};

export default FlowEditor;
