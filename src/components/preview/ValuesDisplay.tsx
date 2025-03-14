
import React from 'react';
import { GlobalValue } from '@/utils/types';

interface ValuesDisplayProps {
  values: GlobalValue[];
}

const ValuesDisplay: React.FC<ValuesDisplayProps> = ({ values }) => {
  if (!values || values.length === 0) return null;

  return (
    <div className="p-2 border-t">
      <p className="text-xs font-medium mb-1 text-muted-foreground">当前值:</p>
      <div className="flex flex-wrap gap-2">
        {values.map(value => (
          <div key={value.id} className="border rounded-md px-2 py-0.5 text-xs flex items-center">
            <span className="font-medium">{value.name}:</span>
            <span className="ml-1">{value.currentValue !== undefined ? value.currentValue : value.initialValue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValuesDisplay;
