
import React, { useCallback, useState } from 'react';
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
import { SceneType } from '@/utils/types';
import { useNodeInteractions } from './useNodeInteractions';

// Custom Node Types
const nodeTypes: NodeTypes = {
  sceneNode: SceneNode
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

// Filter options for scene display
export type SceneFilterOption = 'all' | 'endings' | 'incomplete';

interface FlowEditorProps {
  onSceneSelect: (sceneId: string) => void;
  onPreviewToggle?: () => void;
  onAddSceneWithType?: (type?: SceneType) => void;
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

const FlowEditor = ({ onSceneSelect, onPreviewToggle, onAddSceneWithType }: FlowEditorProps) => {
  const { story, setStory } = useStory();
  const [filterOption, setFilterOption] = useState<SceneFilterOption>('all');
  
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
    onNodeClick: baseOnNodeClick,
    setNodes,
    setEdges,
    transformScenesToNodes
  } = useFlowTransformers(story.scenes);

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

  // Filter nodes based on the selected filter option
  const getFilteredNodes = useCallback(() => {
    if (filterOption === 'all') {
      return nodes;
    }
    
    return nodes.filter(node => {
      if (filterOption === 'endings') {
        return node.data.sceneType === 'ending' || node.data.sceneType === 'bad-ending';
      } else if (filterOption === 'incomplete') {
        return node.data.sceneType === 'normal' && !node.data.hasNextScene;
      }
      return true;
    });
  }, [nodes, filterOption]);

  // Custom node click handler that calls both the base handler and the scene select callback
  const onNodeClick = useCallback((event, node) => {
    baseOnNodeClick(event, node);
    onSceneSelect(node.id);
  }, [baseOnNodeClick, onSceneSelect]);

  // Auto-arrange the nodes
  const handleAutoArrange = useCallback(() => {
    if (!nodes || !edges) return;
    
    const { nodes: layoutedNodes } = getLayoutedElements(nodes, edges);
    setNodes(layoutedNodes);
  }, [nodes, edges, setNodes]);

  // Handler for adding scenes with specific type
  const handleAddScene = useCallback((type?: SceneType) => {
    if (onAddSceneWithType) {
      onAddSceneWithType(type);
    } else {
      addScene(type);
    }
  }, [onAddSceneWithType, addScene]);

  // Handler for changing filter option
  const handleFilterChange = useCallback((option: SceneFilterOption) => {
    setFilterOption(option);
  }, []);

  // Make sure we have nodes before rendering ReactFlow
  if (!nodes || nodes.length === 0) {
    return <FlowEmptyState />;
  }

  // Get filtered nodes based on current filter option
  const filteredNodes = getFilteredNodes();

  return (
    <div className="w-full h-full border rounded-lg bg-white shadow-sm overflow-hidden">
      <FlowCanvas
        nodes={filteredNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        selectedNode={selectedNode}
        onAddScene={handleAddScene}
        onDeleteScene={deleteSelectedScene}
        onPreviewToggle={onPreviewToggle}
        onAutoArrange={handleAutoArrange}
        edgeOptions={edgeOptions}
        revivalEdgeOptions={revivalEdgeOptions}
        filterOption={filterOption}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default FlowEditor;
