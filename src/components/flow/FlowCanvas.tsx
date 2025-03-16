
import React from 'react';
import {
  ReactFlow,
  Background,
  NodeTypes,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Node,
  Edge,
  Connection
} from 'reactflow';
import 'reactflow/dist/style.css';
import { SceneNodeData } from './flowTypes';
import { FlowControls } from './FlowControls';
import FlowPanel from './FlowPanel';
import { SceneFilterOption } from './types/flowTypes';
import FlowFilterPanel from './FlowFilterPanel';

interface FlowCanvasProps {
  nodes: Node<SceneNodeData>[];
  edges: Edge[];
  nodeTypes: NodeTypes;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (params: Connection) => void;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  selectedNode: Node<SceneNodeData> | null;
  onAddScene: (type?: any) => void;
  onDeleteScene: () => void;
  onPreviewToggle?: () => void;
  onAutoArrange?: () => void;
  edgeOptions?: any;
  revivalEdgeOptions?: any;
  filterOption: SceneFilterOption;
  onFilterChange: (option: SceneFilterOption) => void;
}

const FlowCanvas: React.FC<FlowCanvasProps> = ({
  nodes,
  edges,
  nodeTypes,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  selectedNode,
  onAddScene,
  onDeleteScene,
  onPreviewToggle,
  onAutoArrange,
  edgeOptions,
  revivalEdgeOptions,
  filterOption,
  onFilterChange
}) => {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={edgeOptions}
      fitView
      minZoom={0.5}
      maxZoom={2}
      defaultViewport={{ x: 0, y: 0, zoom: 1 }}
    >
      <Background />
      <FlowControls />
      
      <FlowPanel
        selectedNode={selectedNode}
        onAddScene={onAddScene}
        onDeleteScene={onDeleteScene}
        onPreviewToggle={onPreviewToggle}
        onAutoArrange={onAutoArrange}
      />
      
      <FlowFilterPanel 
        filterOption={filterOption}
        onFilterChange={onFilterChange}
      />
    </ReactFlow>
  );
};

export default FlowCanvas;
