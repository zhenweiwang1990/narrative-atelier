
import React from 'react';
import { cn } from '@/lib/utils';

interface SceneNodeProps {
  data: {
    label: string;
    sceneType: string;
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

  return (
    <div className={cn(
      'px-4 py-2 rounded-md border shadow-sm',
      getNodeStyles(),
      selected && 'ring-2 ring-primary'
    )}>
      <div className="font-medium">{data.label}</div>
      <div className="text-xs text-muted-foreground capitalize">{data.sceneType}</div>
    </div>
  );
};

export default SceneNode;
