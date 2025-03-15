
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { GlobalValue } from '@/utils/types';
import { generateId } from '@/utils/storage';

interface GlobalValuesProps {
  values: GlobalValue[];
  onChange: (values: GlobalValue[]) => void;
}

const GlobalValues: React.FC<GlobalValuesProps> = ({ values, onChange }) => {
  const addValue = () => {
    const newValue: GlobalValue = {
      id: generateId('value'),
      name: `变量 ${values.length + 1}`,
      type: 'number',
      initialValue: 0
    };
    onChange([...values, newValue]);
  };

  const updateValue = (id: string, updates: Partial<GlobalValue>) => {
    const updatedValues = values.map(value => 
      value.id === id ? { ...value, ...updates } : value
    );
    onChange(updatedValues);
  };

  const removeValue = (id: string) => {
    onChange(values.filter(value => value.id !== id));
  };

  return (
    <Card className="p-4 space-y-4 max-w-[300px]">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">全局变量</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addValue}
          className="h-8 text-xs flex items-center"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> 添加变量
        </Button>
      </div>

      {values.length === 0 ? (
        <div className="text-center py-4 text-sm text-muted-foreground">
          尚未定义全局变量。添加一个变量来跟踪场景之间的进度。
        </div>
      ) : (
        <div className="space-y-3">
          {values.map(value => (
            <div key={value.id} className="flex gap-2 items-start">
              <div className="flex-1">
                <Label htmlFor={`value-name-${value.id}`} className="text-xs">名称</Label>
                <Input
                  id={`value-name-${value.id}`}
                  value={value.name}
                  onChange={(e) => updateValue(value.id, { name: e.target.value })}
                  className="h-8 text-sm"
                />
              </div>
              <div className="w-24">
                <Label htmlFor={`value-initial-${value.id}`} className="text-xs">初始值</Label>
                <Input
                  id={`value-initial-${value.id}`}
                  type="number"
                  value={value.initialValue}
                  onChange={(e) => updateValue(value.id, { initialValue: parseInt(e.target.value) || 0 })}
                  className="h-8 text-sm"
                />
              </div>
              <div className="pt-5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeValue(value.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default GlobalValues;
