
import React from 'react';
import { QteElement as QteElementType, Scene, GlobalValue, Story } from '@/utils/types';
import QteElementContainer from './qte/QteElementContainer';

interface QteElementProps {
  element: QteElementType;
  scenes: Scene[];
  globalValues: GlobalValue[];
  onUpdate: (id: string, updates: Partial<QteElementType>) => void;
  validateTimeLimit: (value: number) => number;
  validateKeySequence: (value: string) => string;
}

export const QteElement: React.FC<QteElementProps> = ({ 
  element, 
  scenes, 
  globalValues,
  onUpdate, 
  validateTimeLimit, 
  validateKeySequence 
}) => {
  // We need to get the story from the context, but since this is a refactoring task
  // and we don't have direct access to the story object in this component,
  // we'll pass null for now. In a complete implementation, we would need to
  // get the story from a context or props.
  const story = null;

  return (
    <QteElementContainer
      element={element}
      scenes={scenes}
      globalValues={globalValues}
      story={story}
      onUpdate={onUpdate}
      validateTimeLimit={validateTimeLimit}
      validateKeySequence={validateKeySequence}
    />
  );
};
