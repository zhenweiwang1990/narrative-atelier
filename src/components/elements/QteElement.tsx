
import React from 'react';
import { QteElement as QteElementType, Scene, GlobalValue, Story } from '@/utils/types';
import QteElementContainer from './qte/QteElementContainer';

interface QteElementProps {
  element: QteElementType;
  scenes: Scene[];
  globalValues: GlobalValue[];
  story: Story; // Changed from optional to required
  onUpdate: (id: string, updates: Partial<QteElementType>) => void;
  validateTimeLimit: (value: number) => number;
  validateKeySequence: (value: string) => string;
}

export const QteElement: React.FC<QteElementProps> = ({ 
  element, 
  scenes, 
  globalValues,
  story, 
  onUpdate, 
  validateTimeLimit, 
  validateKeySequence 
}) => {
  // Make sure element has a qteType property for backwards compatibility
  const updatedElement = {
    ...element,
    qteType: element.qteType || 'action'
  };

  return (
    <QteElementContainer
      element={updatedElement}
      scenes={scenes}
      globalValues={globalValues}
      story={story}
      onUpdate={onUpdate}
      validateTimeLimit={validateTimeLimit}
      validateKeySequence={validateKeySequence}
    />
  );
};
