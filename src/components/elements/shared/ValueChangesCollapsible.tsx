
import React from 'react';
import { Button } from '@/components/ui/button';
import { GlobalValue, ValueChange } from '@/utils/types';
import { ChevronDown, Plus } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ValueChangesSection from './ValueChangesSection';

interface ValueChangesCollapsibleProps {
  title: string;
  isSuccess: boolean;
  valueChanges: ValueChange[] | undefined;
  globalValues: GlobalValue[];
  onAddValueChange: (isSuccess: boolean) => void;
  onUpdateValueChange: (isSuccess: boolean, valueId: string, change: number) => void;
  onRemoveValueChange: (isSuccess: boolean, valueId: string) => void;
}

const ValueChangesCollapsible: React.FC<ValueChangesCollapsibleProps> = ({
  title,
  isSuccess,
  valueChanges = [],
  globalValues,
  onAddValueChange,
  onUpdateValueChange,
  onRemoveValueChange
}) => {
  return (
    <Collapsible className="border rounded-md p-2 bg-muted/20">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-xs font-medium">
        {title} <ChevronDown className="h-3 w-3" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        <ValueChangesSection
          isSuccess={isSuccess}
          valueChanges={valueChanges}
          globalValues={globalValues}
          onAddValueChange={onAddValueChange}
          onUpdateValueChange={onUpdateValueChange}
          onRemoveValueChange={onRemoveValueChange}
        />
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddValueChange(isSuccess)}
          className="mt-2 h-7 text-xs w-full"
          disabled={valueChanges.length >= globalValues.length}
        >
          <Plus className="h-3 w-3 mr-1" /> 添加值变化
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ValueChangesCollapsible;
