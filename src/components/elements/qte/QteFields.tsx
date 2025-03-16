
import React from 'react';
import { QteElement } from '@/utils/types';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import QteDescription from './QteDescription';
import ActionQteFields from './types/ActionQteFields';
import ComboQteFields from './types/ComboQteFields';
import UnlockQteFields from './types/UnlockQteFields';

interface QteFieldsProps {
  element: QteElement;
  onUpdate: (id: string, updates: Partial<QteElement>) => void;
  validateTimeLimit: (value: number) => number;
  validateKeySequence: (value: string) => string;
}

const QteFields: React.FC<QteFieldsProps> = ({
  element,
  onUpdate,
  validateTimeLimit,
  validateKeySequence
}) => {
  const qteType = element.qteType || 'action'; // Default to 'action' for backwards compatibility

  // Handle QTE type change
  const handleQteTypeChange = (value: string) => {
    if (value) {
      const qteType = value as 'action' | 'combo' | 'unlock';
      onUpdate(element.id, { qteType });
    }
  };

  // Render the specific QTE type fields based on selected type
  const renderQteTypeFields = () => {
    switch (qteType) {
      case 'action':
        return (
          <ActionQteFields
            element={element}
            onUpdate={onUpdate}
            validateTimeLimit={validateTimeLimit}
            validateKeySequence={validateKeySequence}
          />
        );
      case 'combo':
        return (
          <ComboQteFields
            element={element}
            onUpdate={onUpdate}
            validateTimeLimit={validateTimeLimit}
          />
        );
      case 'unlock':
        return (
          <UnlockQteFields
            element={element}
            onUpdate={onUpdate}
            validateTimeLimit={validateTimeLimit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <QteDescription element={element} onUpdate={onUpdate} />
      
      <div className="mb-4">
        <Label className="text-xs mb-2 block">QTE类型</Label>
        <ToggleGroup 
          type="single" 
          value={qteType} 
          onValueChange={handleQteTypeChange}
          className="flex justify-start"
        >
          <ToggleGroupItem value="action" className="text-xs px-3 py-1">QTE动作</ToggleGroupItem>
          <ToggleGroupItem value="combo" className="text-xs px-3 py-1">QTE连击</ToggleGroupItem>
          <ToggleGroupItem value="unlock" className="text-xs px-3 py-1">QTE解锁</ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {renderQteTypeFields()}
    </div>
  );
};

export default QteFields;
