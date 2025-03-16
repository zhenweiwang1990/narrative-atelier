
import React, { useCallback, useState } from 'react';
import { NodeTypes } from 'reactflow';
import 'reactflow/dist/style.css';
import { useStory } from '../Layout';
import SceneNode from './SceneNode';
import { useFlowTransformers } from './useFlowTransformers';
import { useSceneManagement } from './useSceneManagement';
import FlowCanvas from './FlowCanvas';
import FlowEmptyState from './FlowEmptyState';
import FlowLoadingState from './FlowLoadingState';
import { SceneFilterOption, FlowEditorProps } from './types/flowTypes';
import { edgeOptions, revivalEdgeOptions } from './configs/edgeConfigs';
import { getLayoutedElements } from './utils/layoutUtils';
import { useNodeFiltering } from './hooks/useNodeFiltering';

// Custom Node Types
const nodeTypes: NodeTypes = {
  sceneNode: SceneNode
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

  const { getFilteredNodes } = useNodeFiltering(nodes, filterOption);

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
    if (onAddSceneWithType && type) {
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
