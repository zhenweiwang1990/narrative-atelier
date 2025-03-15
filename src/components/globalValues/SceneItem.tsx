
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import ElementItem from "./ElementItem";
import { ValueModification } from "./types";
import { Story, ElementType } from "@/utils/types";

interface SceneItemProps {
  scene: {
    id: string;
    title: string;
    elements: {
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
    }[];
  };
  story: Story;
  getDisplayValue: (modification: ValueModification) => number;
  handleValueChange: (modification: ValueModification, newValue: string) => void;
}

const SceneItem: React.FC<SceneItemProps> = ({ 
  scene, 
  story, 
  getDisplayValue, 
  handleValueChange 
}) => {
  return (
    <Collapsible key={scene.id} className="border rounded-lg">
      <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-muted/20 font-medium">
        {scene.title}
        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 pt-0 divide-y">
        {scene.elements.map(element => (
          <ElementItem
            key={element.key}
            element={element}
            story={story}
            getDisplayValue={getDisplayValue}
            handleValueChange={handleValueChange}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SceneItem;
