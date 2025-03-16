
import React from 'react';
import { QteElement } from '@/utils/types';
import { Separator } from '@/components/ui/separator';
import QteFields from './QteFields';

interface QteBasicFieldsProps {
  element: QteElement;
  onUpdate: (id: string, updates: Partial<QteElement>) => void;
  validateTimeLimit: (value: number) => number;
  validateKeySequence: (value: string) => string;
}

const QteBasicFields: React.FC<QteBasicFieldsProps> = ({
  element,
  onUpdate,
  validateTimeLimit,
  validateKeySequence
}) => {
  return (
    <>
      <QteFields 
        element={element}
        onUpdate={onUpdate}
        validateTimeLimit={validateTimeLimit}
        validateKeySequence={validateKeySequence}
      />
      <Separator className="my-3" />
    </>
  );
};

export default QteBasicFields;
