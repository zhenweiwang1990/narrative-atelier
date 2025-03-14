
import React from 'react';
import {
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  NodeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useStory } from './Layout';
import SceneNode from './flow/SceneNode';
import { useFlowTransformers } from './flow/useFlowTransformers';
import { useSceneManagement } from './flow/useSceneManagement';
import FlowActionsPanel from './flow/FlowActionsPanel';

// Custom Node Types
const nodeTypes: NodeTypes = {
  scene: SceneNode
};

interface FlowEditorProps {
  onSceneSelect: (sceneId: string) => void;
}

const FlowEditor = ({ onSceneSelect }: FlowEditorProps) => {
  const { story, setStory } = useStory();
  
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
        
        <FlowActionsPanel
          selectedNode={selectedNode}
          onAddScene={addScene}
          onDeleteScene={deleteSelectedScene}
        />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
