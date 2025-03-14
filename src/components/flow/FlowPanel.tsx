
import React from 'react';
import { Panel } from 'reactflow';
import FlowActionsPanel from './FlowActionsPanel';
import { SceneNodeData } from './flowTypes';
import { Node } from 'reactflow';

interface FlowPanelProps {
  selectedNode: Node<SceneNodeData> | null;
  onAddScene: () => void;
  onDeleteScene: () => void;
}

const FlowPanel = ({ selectedNode, onAddScene, onDeleteScene }: FlowPanelProps) => {
  if (!selectedNode) return null;
  
  return (
    <Panel position="top-right" className="bg-white p-1 rounded-md shadow-sm border flex space-x-1">
      <FlowActionsPanel
        selectedNode={selectedNode}
        onAddScene={onAddScene}
        onDeleteScene={onDeleteScene}
      />
    </Panel>
  );
};

export default FlowPanel;
