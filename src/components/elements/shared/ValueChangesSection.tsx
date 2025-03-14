
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlobalValue, ValueChange } from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';

interface ValueChangesSectionProps {
  isSuccess: boolean;
  valueChanges: ValueChange[] | undefined;
  globalValues: GlobalValue[];
  onAddValueChange: (isSuccess: boolean) => void;
  onUpdateValueChange: (isSuccess: boolean, valueId: string, change: number) => void;
  onRemoveValueChange: (isSuccess: boolean, valueId: string) => void;
}

const ValueChangesSection: React.FC<ValueChangesSectionProps> = ({
  isSuccess,
  valueChanges = [],
  globalValues,
  onAddValueChange,
  onUpdateValueChange,
  onRemoveValueChange
}) => {
  return (
    <div className="pt-2">
      {valueChanges.length > 0 ? (
        <div className="space-y-2">
          {valueChanges.map(valueChange => (
            <div key={valueChange.valueId} className="flex items-center gap-2">
              <div className="flex-1">
                <Select
                  value={valueChange.valueId}
                  onValueChange={(newValueId) => {
                    onRemoveValueChange(isSuccess, valueChange.valueId);
                    onUpdateValueChange(isSuccess, newValueId, valueChange.change);
                  }}
                >
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue placeholder="选择变量" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {globalValues.map(v => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-20">
                <Input
                  type="number"
                  value={valueChange.change}
                  onChange={(e) => onUpdateValueChange(
                    isSuccess,
                    valueChange.valueId, 
                    parseInt(e.target.value) || 0
                  )}
                  className="h-7 text-xs"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveValueChange(isSuccess, valueChange.valueId)}
                className="h-7 w-7 text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">未定义值变化。</p>
      )}
    </div>
  );
};

export default ValueChangesSection;
