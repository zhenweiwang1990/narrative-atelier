
import React from 'react';
import {
  ReactFlow, 
  Background, 
  Controls,
  NodeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useStory } from './Layout';
import SceneNode from './flow/SceneNode';
import { useFlowTransformers } from './flow/useFlowTransformers';
import { useSceneManagement } from './flow/useSceneManagement';
import FlowActionsPanel from './flow/FlowActionsPanel';
import { SceneNodeData } from './flow/flowTypes';

// Custom Node Types
const nodeTypes: NodeTypes = {
  scene: SceneNode
};

interface FlowEditorProps {
  onSceneSelect: (sceneId: string) => void;
}

const FlowEditor = ({ onSceneSelect }: FlowEditorProps) => {
  const { story, setStory } = useStory();
  
  // Return early if there's no story
  if (!story) {
    return <div className="w-full h-full flex items-center justify-center">Loading story data...</div>;
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
    return <div className="w-full h-full flex items-center justify-center">No scenes available</div>;
  }

  return (
    <div className="w-full h-full border rounded-lg bg-white shadow-sm overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background />
        <Controls position="bottom-right" showInteractive={false} />
        
        {/* Only render FlowActionsPanel if a node is selected - this prevents the Children.only error */}
        {selectedNode && (
          <FlowActionsPanel
            selectedNode={selectedNode}
            onAddScene={addScene}
            onDeleteScene={deleteSelectedScene}
          />
        )}
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
