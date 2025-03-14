
import React from 'react';
import { Panel } from 'reactflow';
import { Button } from '@/components/ui/button';
import { Plus, Trash, Eye, LayoutGrid } from 'lucide-react';
import { SceneNodeData } from './flowTypes';
import { Node } from 'reactflow';

interface FlowPanelProps {
  selectedNode: Node<SceneNodeData> | null;
  onAddScene: () => void;
  onDeleteScene: () => void;
  onPreviewToggle?: () => void;
  onAutoArrange?: () => void;
}

const FlowPanel: React.FC<FlowPanelProps> = ({
  selectedNode,
  onAddScene,
  onDeleteScene,
  onPreviewToggle,
  onAutoArrange
}) => {
  return (
    <Panel position="top-left" className="bg-white p-2 rounded-md shadow-sm flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onAddScene}
        className="h-8 text-xs"
      >
        <Plus className="h-4 w-4 mr-1" /> Add Scene
      </Button>
      
      {selectedNode && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs text-destructive border-destructive hover:bg-destructive/10"
          onClick={onDeleteScene}
        >
          <Trash className="h-4 w-4 mr-1" /> Delete Scene
        </Button>
      )}
      
      {onPreviewToggle && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={onPreviewToggle}
        >
          <Eye className="h-4 w-4 mr-1" /> Toggle Preview
        </Button>
      )}
      
      {onAutoArrange && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={onAutoArrange}
        >
          <LayoutGrid className="h-4 w-4 mr-1" /> Auto Arrange
        </Button>
      )}
    </Panel>
  );
};

export default FlowPanel;
