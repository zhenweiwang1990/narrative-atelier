
import React from 'react';
import { GlobalValue } from '@/utils/types';

interface ValuesDisplayProps {
  values: GlobalValue[];
  compact?: boolean; // New prop for compact mode (in bottom bar)
}

const ValuesDisplay: React.FC<ValuesDisplayProps> = ({ values, compact = false }) => {
  if (!values || values.length === 0) return null;

  // Compact mode for bottom bar
  if (compact) {
    return (
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none px-1">
        {values.map(value => (
          <div 
            key={value.id} 
            className="value-item-compact border rounded-md px-2 py-0.5 text-xs flex items-center flex-shrink-0 dark:bg-muted/30 dark:border-muted"
          >
            <span className="font-medium">{value.name}:</span>
            <span className="ml-1">{value.currentValue !== undefined ? value.currentValue : value.initialValue}</span>
          </div>
        ))}
      </div>
    );
  }

  // Original mode for sidebar display
  return (
    <div className="values-display p-2 border-t">
      <p className="text-xs font-medium mb-1 text-muted-foreground">当前值:</p>
      <div className="flex flex-wrap gap-2">
        {values.map(value => (
          <div 
            key={value.id} 
            className="value-item border rounded-md px-2 py-0.5 text-xs flex items-center dark:bg-muted/20 dark:border-muted"
          >
            <span className="font-medium">{value.name}:</span>
            <span className="ml-1">{value.currentValue !== undefined ? value.currentValue : value.initialValue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuesDisplay;
