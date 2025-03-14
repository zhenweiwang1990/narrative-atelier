
import React from 'react';
import { cn } from '@/lib/utils';
import { SceneElement } from '@/utils/types';
import { Handle, Position } from 'reactflow';
import { MapPin } from 'lucide-react';

interface SceneNodeProps {
  data: {
    label: string;
    sceneType: string;
    locationName?: string;
    elements?: SceneElement[];
  };
  selected: boolean;
}

const SceneNode = ({ data, selected }: SceneNodeProps) => {
  const getNodeStyles = () => {
    switch (data.sceneType) {
      case 'start':
        return 'border-green-500 bg-green-50';
      case 'ending':
        return 'border-blue-500 bg-blue-50';
      case 'bad-ending':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300';
    }
  };

  // Generate element indicators
  const renderElementIndicators = () => {
    if (!data.elements || data.elements.length === 0) return null;

    const elementTypes = data.elements.map(elem => elem.type);
    const elementCounts: Record<string, number> = {};
    
    elementTypes.forEach(type => {
      elementCounts[type] = (elementCounts[type] || 0) + 1;
    });

    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {Object.entries(elementCounts).map(([type, count]) => (
          <div 
            key={type}
            className={cn(
              "text-[10px] px-1 rounded",
              type === 'narration' && 'bg-gray-200',
              type === 'dialogue' && 'bg-blue-200',
              type === 'thought' && 'bg-purple-200',
              type === 'choice' && 'bg-amber-200',
              type === 'qte' && 'bg-red-200',
              type === 'dialogueTask' && 'bg-green-200'
            )}
          >
            {type}: {count}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      
      <div className={cn(
        'px-3 py-2 rounded-md border shadow-sm w-48',
        getNodeStyles(),
        selected && 'ring-2 ring-primary'
      )}>
        <div className="font-medium text-sm">{data.label}</div>
        
        {data.locationName && (
          <div className="flex items-center text-[10px] text-muted-foreground mt-1">
            <MapPin className="h-3 w-3 mr-1" /> {data.locationName}
          </div>
        )}
        
        <div className="text-[10px] text-muted-foreground capitalize mt-1">{data.sceneType}</div>
        
        {renderElementIndicators()}
      </div>
      
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default SceneNode;
