
import React, { useCallback, useState, useEffect } from 'react';
import { NodeTypes, Connection, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { useStory } from '../Layout';
import SceneNode from './SceneNode';
import { useFlowTransformers } from './useFlowTransformers';
import { useSceneManagement } from './useSceneManagement';
import FlowCanvas from './FlowCanvas';
import FlowEmptyState from './FlowEmptyState';
import FlowLoadingState from './FlowLoadingState';
import dagre from 'dagre';

// Custom Node Types
const nodeTypes: NodeTypes = {
  scene: SceneNode
};

// Edge settings for the graph
const edgeOptions = {
  type: 'smoothstep',
  animated: false,
  style: { stroke: '#888' },
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

// Edge settings for revival points
const revivalEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  style: { stroke: '#d32f2f', strokeWidth: 2, strokeDasharray: '5,5' },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#d32f2f',
  },
};

interface FlowEditorProps {
  onSceneSelect: (sceneId: string) => void;
  onPreviewToggle?: () => void;
}

// Auto-layout function using dagre
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 180;
  const nodeHeight = 36;
  
  // Set the graph options
  dagreGraph.setGraph({ rankdir: direction });

  // Add nodes to the graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Compute the layout
  dagre.layout(dagreGraph);

  // Get the positions of the nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

const FlowEditor = ({ onSceneSelect, onPreviewToggle }: FlowEditorProps) => {
  const { story, setStory } = useStory();
  const [isInitialized, setIsInitialized] = useState(false);
  
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

  // Prevent initial flicker
  useEffect(() => {
    if (nodes && nodes.length > 0 && !isInitialized) {
      setIsInitialized(true);
    }
  }, [nodes, isInitialized]);

  // Auto-arrange the nodes
  const handleAutoArrange = useCallback(() => {
    if (!nodes || !edges) return;
    
    const { nodes: layoutedNodes } = getLayoutedElements(nodes, edges);
    setNodes(layoutedNodes);
  }, [nodes, edges, setNodes]);

  // Make sure we have nodes before rendering ReactFlow
  if (!nodes || nodes.length === 0) {
    return <FlowEmptyState />;
  }

  // Show loading state during initialization
  if (!isInitialized) {
    return <FlowLoadingState />;
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
        onAutoArrange={handleAutoArrange}
        edgeOptions={edgeOptions}
        revivalEdgeOptions={revivalEdgeOptions}
      />
    </div>
  );
};

export default FlowEditor;
