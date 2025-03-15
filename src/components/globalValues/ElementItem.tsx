
import React from "react";
import { Badge } from "@/components/ui/badge";
import { getElementColorClass, getElementTypeLabel } from "../flow/editor/ElementTypeUtils";
import { ElementType } from "@/utils/types";
import OutcomeItem from "./OutcomeItem";
import { ValueModification } from "./types";
import { Story } from "@/utils/types";

interface ElementItemProps {
  element: {
    key: string;
    id: string;
    index: number;
    title: string;
    type: ElementType;
    outcomes: {
      key: string;
      title: string;
      modifications: ValueModification[];
    }[];
  };
  story: Story;
  getDisplayValue: (modification: ValueModification) => number;
  handleValueChange: (modification: ValueModification, newValue: string) => void;
}

const ElementItem: React.FC<ElementItemProps> = ({ 
  element, 
  story, 
  getDisplayValue, 
  handleValueChange 
}) => {
  return (
    <div className="py-3">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className="font-normal">序号 {element.index + 1}</Badge>
        <div 
          className={`w-5 h-5 rounded flex items-center justify-center text-white text-xs font-medium ${getElementColorClass(element.type)}`}
        >
          {getElementTypeLabel(element.type)}
        </div>
        <span className="text-sm font-medium truncate">{element.title}</span>
      </div>
      
      <div className="space-y-2 pl-4">
        {element.outcomes.map(outcome => (
          <OutcomeItem
            key={outcome.key}
            outcome={outcome}
            story={story}
            getDisplayValue={getDisplayValue}
            handleValueChange={handleValueChange}
          />
        ))}
      </div>
    </div>
  );
};

export default ElementItem;
