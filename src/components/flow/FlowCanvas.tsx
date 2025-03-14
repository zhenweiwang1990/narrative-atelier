
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
import FlowControls from './FlowControls';
import FlowPanel from './FlowPanel';

interface FlowCanvasProps {
  nodes: Node<SceneNodeData>[];
  edges: Edge[];
  nodeTypes: NodeTypes;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (params: Connection) => void;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  selectedNode: Node<SceneNodeData> | null;
  onAddScene: () => void;
  onDeleteScene: () => void;
  onPreviewToggle?: () => void;
  onAutoArrange?: () => void;
  edgeOptions?: any;
  revivalEdgeOptions?: any;
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
  revivalEdgeOptions
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
      <FlowControls position="bottom-right" showInteractive={false} />
      
      <FlowPanel
        selectedNode={selectedNode}
        onAddScene={onAddScene}
        onDeleteScene={onDeleteScene}
        onPreviewToggle={onPreviewToggle}
        onAutoArrange={onAutoArrange}
      />
    </ReactFlow>
  );
};

export default FlowCanvas;
