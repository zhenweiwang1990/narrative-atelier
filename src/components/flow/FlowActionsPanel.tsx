
import React from 'react';
import { Panel } from 'reactflow';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Node } from 'reactflow';

interface FlowActionsPanelProps {
  selectedNode: Node | null;
  onAddScene: () => void;
  onDeleteScene: () => void;
}

const FlowActionsPanel = ({ 
  selectedNode, 
  onAddScene, 
  onDeleteScene 
}: FlowActionsPanelProps) => {
  return (
    <Panel position="top-right" className="bg-white p-2 rounded-md shadow-sm border">
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center text-xs"
          onClick={onAddScene}
        >
          <Plus className="h-3 w-3 mr-1" /> Add Scene
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center text-xs"
          onClick={onDeleteScene}
          disabled={!selectedNode}
        >
          <Trash2 className="h-3 w-3 mr-1 text-destructive" /> Delete
        </Button>
      </div>
    </Panel>
  );
};

export default FlowActionsPanel;
