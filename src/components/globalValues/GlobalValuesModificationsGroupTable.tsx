
import React, { useMemo } from "react";
import { GlobalValuesModificationsTableProps } from "./types";
import { useModificationsTable } from "./useModificationsTable";
import EmptyModificationsState from "./EmptyModificationsState";
import SceneItem from "./SceneItem";
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
          <SceneItem
            key={scene.id}
            scene={scene}
            story={story}
            getDisplayValue={getDisplayValue}
            handleValueChange={handleValueChange}
          />
        ))}
      </div>
    </div>
  );
};

export default GlobalValuesModificationsGroupTable;
