
import React, { useMemo } from "react";
import { GlobalValuesModificationsTableProps } from "./types";
import { useModificationsTable } from "./useModificationsTable";
import EmptyModificationsState from "./EmptyModificationsState";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getValueName } from "./tableUtils";
import { getElementColorClass, getElementTypeLabel } from "../flow/editor/ElementTypeUtils";
import { ElementType } from "@/utils/types";

const GlobalValuesModificationsGroupTable: React.FC<GlobalValuesModificationsTableProps> = ({ 
  story, 
  onModificationUpdate 
}) => {
  const {
    valueModifications,
    handleValueChange,
    getDisplayValue,
    isEmpty
  } = useModificationsTable(story, onModificationUpdate);
  
  // Group modifications by scene, element, and outcome/option
  const groupedModifications = useMemo(() => {
    if (!valueModifications.length) return [];
    
    // First group by scene
    const byScene: Record<string, typeof valueModifications> = {};
    valueModifications.forEach(mod => {
      if (!byScene[mod.sceneId]) {
        byScene[mod.sceneId] = [];
      }
      byScene[mod.sceneId].push(mod);
    });
    
    // Convert to array of scenes with grouped elements
    return Object.entries(byScene).map(([sceneId, sceneMods]) => {
      // Group by element within scene
      const byElement: Record<string, typeof valueModifications> = {};
      sceneMods.forEach(mod => {
        const elementKey = `${mod.elementId}-${mod.elementIndex}`;
        if (!byElement[elementKey]) {
          byElement[elementKey] = [];
        }
        byElement[elementKey].push(mod);
      });
      
      // Convert to array of elements with grouped outcomes/options
      const elements = Object.entries(byElement).map(([elementKey, elementMods]) => {
        // Group by outcome/option within element
        const byOutcome: Record<string, typeof valueModifications> = {};
        elementMods.forEach(mod => {
          const outcomeKey = `${mod.outcomeType}-${mod.choiceOptionId || ''}`;
          if (!byOutcome[outcomeKey]) {
            byOutcome[outcomeKey] = [];
          }
          byOutcome[outcomeKey].push(mod);
        });
        
        // Convert to array of outcomes/options
        const outcomes = Object.entries(byOutcome).map(([outcomeKey, outcomeMods]) => {
          return {
            key: outcomeKey,
            title: outcomeMods[0].optionOrOutcome,
            modifications: outcomeMods
          };
        });
        
        // Return element with its outcomes/options
        return {
          key: elementKey,
          id: elementMods[0].elementId,
          index: elementMods[0].elementIndex,
          title: elementMods[0].elementTitle,
          type: elementMods[0].elementType as ElementType,
          outcomes
        };
      });
      
      // Return scene with its elements
      return {
        id: sceneId,
        title: sceneMods[0].sceneTitle,
        elements
      };
    });
  }, [valueModifications]);
  
  if (!story) {
    return <EmptyModificationsState hasStory={false} />;
  }
  
  if (isEmpty) {
    return <EmptyModificationsState hasStory={true} />;
  }
  
  return (
    <div className="w-full overflow-hidden">
      <div className="space-y-4">
        {groupedModifications.map(scene => (
          <Collapsible key={scene.id} className="border rounded-lg">
            <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-muted/20 font-medium">
              {scene.title}
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 pt-0 divide-y">
              {scene.elements.map(element => (
                <div key={element.key} className="py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="font-normal">序号 {element.index + 1}</Badge>
                    <div 
                      className={`w-5 h-5 rounded flex items-center justify-center text-white text-xs font-medium ${getElementColorClass(element.type as ElementType)}`}
                    >
                      {getElementTypeLabel(element.type as ElementType)}
                    </div>
                    <span className="text-sm font-medium truncate">{element.title}</span>
                  </div>
                  
                  <div className="space-y-2 pl-4">
                    {element.outcomes.map(outcome => (
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
                    ))}
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

interface ValueChangesListProps {
  modifications: any[];
  story: any;
  getDisplayValue: (modification: any) => number;
  handleValueChange: (modification: any, newValue: string) => void;
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

export default GlobalValuesModificationsGroupTable;
