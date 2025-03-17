
import React from 'react';
import { QteElement } from '@/utils/types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
  const qteType = element.qteType || 'action'; // 默认为'action'以兼容旧版本

  // 处理QTE类型变更
  const handleQteTypeChange = (value: string) => {
    const qteType = value as 'action' | 'combo' | 'unlock';
    onUpdate(element.id, { qteType });
  };

  // 根据选定的类型渲染特定的QTE类型字段
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
        <RadioGroup 
          value={qteType} 
          onValueChange={handleQteTypeChange}
          className="flex flex-wrap gap-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="action" id="qte-action" />
            <Label htmlFor="qte-action" className="text-sm cursor-pointer">快速反应</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="combo" id="qte-combo" />
            <Label htmlFor="qte-combo" className="text-sm cursor-pointer">方向连击</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unlock" id="qte-unlock" />
            <Label htmlFor="qte-unlock" className="text-sm cursor-pointer">图案解锁</Label>
          </div>
        </RadioGroup>
      </div>
      
      {renderQteTypeFields()}
    </div>
  );
};

export default QteFields;
