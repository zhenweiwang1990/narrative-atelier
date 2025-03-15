
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ValueChangesList from "./ValueChangesList";
import { ValueModification } from "./types";
import { Story } from "@/utils/types";

interface OutcomeItemProps {
  outcome: {
    key: string;
    title: string;
    modifications: ValueModification[];
  };
  story: Story;
  getDisplayValue: (modification: ValueModification) => number;
  handleValueChange: (modification: ValueModification, newValue: string) => void;
}

const OutcomeItem: React.FC<OutcomeItemProps> = ({ 
  outcome, 
  story, 
  getDisplayValue, 
  handleValueChange 
}) => {
  return (
    <Collapsible key={outcome.key} className="border rounded-md">
      <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-muted/20 text-sm">
        <div className="flex items-center gap-2">
          <Badge className={outcome.title === '成功' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                           outcome.title === '失败' ? 'bg-red-100 text-red-800 hover:bg-red-100' : 
                           'bg-blue-100 text-blue-800 hover:bg-blue-100'}>
            {outcome.title}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {outcome.modifications.length} 个变量变更
          </span>
        </div>
        <ChevronDown className="h-3 w-3 shrink-0 opacity-50" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2">
        <ValueChangesList 
          modifications={outcome.modifications}
          story={story}
          getDisplayValue={getDisplayValue}
          handleValueChange={handleValueChange}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default OutcomeItem;
