
import React from 'react';
import { Node } from 'reactflow';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Smartphone } from 'lucide-react';
import { SceneNodeData } from './flowTypes';

interface FlowPanelProps {
  selectedNode: Node<SceneNodeData> | null;
  onAddScene: () => void;
  onDeleteScene: () => void;
  onPreviewToggle?: () => void;
}

const FlowPanel = ({ selectedNode, onAddScene, onDeleteScene, onPreviewToggle }: FlowPanelProps) => {
  return (
    <div className="absolute top-2 left-2 p-2 bg-background/80 backdrop-blur-sm rounded-md border shadow-sm z-10">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAddScene}
          className="text-xs h-8"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Scene
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDeleteScene}
          disabled={!selectedNode}
          className="text-xs h-8"
        >
          <Trash2 className="h-4 w-4 mr-1" /> Delete Scene
        </Button>
        
        {onPreviewToggle && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPreviewToggle}
            className="text-xs h-8"
          >
            <Smartphone className="h-4 w-4 mr-1" /> Toggle Preview
          </Button>
        )}
      </div>
    </div>
  );
};

export default FlowPanel;
