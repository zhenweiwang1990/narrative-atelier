
import React from "react";
import { Input } from "@/components/ui/input";
import { getValueName } from "./tableUtils";
import { ValueModification } from "./types";
import { Story } from "@/utils/types";

interface ValueChangesListProps {
  modifications: ValueModification[];
  story: Story;
  getDisplayValue: (modification: ValueModification) => number;
  handleValueChange: (modification: ValueModification, newValue: string) => void;
}

const ValueChangesList: React.FC<ValueChangesListProps> = ({ 
  modifications, 
  story, 
  getDisplayValue, 
  handleValueChange 
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {modifications.map(mod => {
        const value = getDisplayValue(mod);
        const isPositive = value > 0;
        const isNegative = value < 0;
        
        return (
          <div 
            key={mod.valueId} 
            className={`flex items-center justify-between border rounded p-2 ${
              isPositive ? 'bg-green-50 border-green-200' : 
              isNegative ? 'bg-red-50 border-red-200' : 
              'bg-background'
            }`}
          >
            <span className="text-sm font-medium">
              {getValueName(story, mod.valueId)}
            </span>
            <Input
              type="number"
              value={value}
              onChange={(e) => handleValueChange(mod, e.target.value)}
              className={`h-7 w-20 text-sm ml-2 ${
                isPositive ? 'text-green-600' : 
                isNegative ? 'text-red-600' : ''
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ValueChangesList;
