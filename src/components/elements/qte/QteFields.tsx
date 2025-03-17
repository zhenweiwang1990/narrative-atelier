
import React from 'react';
import { QteElement } from '@/utils/types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
      
      <div className="mb-2">
        <Label className="text-xs mb-1 block">QTE类型</Label>
        <Select 
          value={qteType} 
          onValueChange={handleQteTypeChange}
        >
          <SelectTrigger className="h-7 text-xs">
            <SelectValue placeholder="选择QTE类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="action">QTE动作</SelectItem>
            <SelectItem value="combo">QTE连击</SelectItem>
            <SelectItem value="unlock">QTE解锁</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {renderQteTypeFields()}
    </div>
  );
};

export default QteFields;
