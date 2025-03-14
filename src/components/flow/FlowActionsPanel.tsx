
import React from 'react';
import { Panel } from 'reactflow';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Node, useReactFlow } from 'reactflow';

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
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <Panel position="top-right" className="bg-white p-1 rounded-md shadow-sm border flex space-x-1">
      <Button 
        variant="outline" 
        size="icon" 
        className="h-7 w-7"
        onClick={onAddScene}
        title="Add Scene"
      >
        <Plus className="h-3.5 w-3.5" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={onDeleteScene}
        disabled={!selectedNode}
        title="Delete Scene"
      >
        <Trash2 className="h-3.5 w-3.5 text-destructive" />
      </Button>

      <div className="border-l mx-1 h-7"></div>
      
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => zoomIn()}
        title="Zoom In"
      >
        <ZoomIn className="h-3.5 w-3.5" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => zoomOut()}
        title="Zoom Out"
      >
        <ZoomOut className="h-3.5 w-3.5" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => fitView()}
        title="Fit View"
      >
        <Maximize className="h-3.5 w-3.5" />
      </Button>
    </Panel>
  );
};

export default FlowActionsPanel;
