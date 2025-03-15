
import { useMemo, useState } from "react";
import { ValueModification } from "./types";
import { extractValueModifications, getAllPossibleOptions } from "./tableUtils";
import { Story } from "@/utils/types";

interface ModificationGroup {
  items: ValueModification[];
  subgroups: Record<string, { items: ValueModification[] }>;
}

export const useModificationsTable = (
  story: Story | null,
  onModificationUpdate: (modification: ValueModification) => void
) => {
  // State for tracking edited values
  const [editedValues, setEditedValues] = useState<Record<string, number>>({});
  
  // Process story data to get all value modifications
  const valueModifications = useMemo(() => 
    extractValueModifications(story), [story]
  );

  // Group modifications by element and then by option/outcome
  const groupedModifications = useMemo(() => {
    const groupedData: Record<string, ModificationGroup> = {};
    
    if (story) {
      // Get all possible options/outcomes, including those without value changes
      const allOptions = getAllPossibleOptions(story);
      
      // First populate with all possible options/outcomes
      allOptions.forEach(option => {
        const elementKey = `${option.sceneId}-${option.elementId}`;
        
        let optionKey = '';
        if (option.outcomeType === 'choice' && option.choiceOptionId) {
          optionKey = option.choiceOptionId;
        } else {
          optionKey = `${option.elementId}-${option.outcomeType}`;
        }
        
        // Initialize first level group if it doesn't exist
        if (!groupedData[elementKey]) {
          groupedData[elementKey] = {
            items: [],
            subgroups: {}
          };
        }
        
        // Initialize second level group if it doesn't exist
        if (!groupedData[elementKey].subgroups[optionKey]) {
          groupedData[elementKey].subgroups[optionKey] = {
            items: []
          };
        }
      });
    }
    
    // Then add the actual modifications
    valueModifications.forEach(modification => {
      // First level group key: elementId
      const elementKey = `${modification.sceneId}-${modification.elementId}`;
      
      // Second level group key depends on element type
      let optionKey = '';
      if (modification.outcomeType === 'choice' && modification.choiceOptionId) {
        optionKey = modification.choiceOptionId;
      } else {
        optionKey = `${modification.elementId}-${modification.outcomeType}`;
      }
      
      // Initialize first level group if it doesn't exist
      if (!groupedData[elementKey]) {
        groupedData[elementKey] = {
          items: [],
          subgroups: {}
        };
      }
      
      // Add item to first level group
      groupedData[elementKey].items.push(modification);
      
      // Initialize second level group if it doesn't exist
      if (!groupedData[elementKey].subgroups[optionKey]) {
        groupedData[elementKey].subgroups[optionKey] = {
          items: []
        };
      }
      
      // Add item to second level group
      groupedData[elementKey].subgroups[optionKey].items.push(modification);
    });
    
    return groupedData;
  }, [valueModifications, story]);
  
  // Function to get display value for a modification
  const getDisplayValue = (modification: ValueModification): number => {
    const modificationKey = `${modification.sceneId}-${modification.elementId}-${modification.valueId}-${modification.outcomeType}-${modification.choiceOptionId || ''}`;
    return editedValues[modificationKey] !== undefined ? editedValues[modificationKey] : modification.valueChange;
  };
  
  const handleValueChange = (modification: ValueModification, newValue: string) => {
    const numericValue = parseInt(newValue) || 0;
    const modificationKey = `${modification.sceneId}-${modification.elementId}-${modification.valueId}-${modification.outcomeType}-${modification.choiceOptionId || ''}`;
    
    setEditedValues({
      ...editedValues,
      [modificationKey]: numericValue
    });
    
    // Apply the edited value to the modification
    const updatedModification = {
      ...modification,
      valueChange: numericValue
    };
    
    onModificationUpdate(updatedModification);
  };
  
  const handleAddValueChange = (
    sceneId: string, 
    elementId: string, 
    elementIndex: number,
    elementType: string,
    elementTitle: string,
    sceneTitle: string,
    outcomeType: 'choice' | 'success' | 'failure',
    optionOrOutcome: string,
    choiceOptionId?: string
  ) => {
    if (!story || !story.globalValues.length) return;
    
    // Find a global value that hasn't been used for this option/outcome
    const existingModifications = Object.values(groupedModifications)
      .flatMap(group => Object.values(group.subgroups))
      .flatMap(subgroup => subgroup.items)
      .filter(mod => 
        mod.elementId === elementId && 
        mod.outcomeType === outcomeType && 
        mod.choiceOptionId === choiceOptionId
      );
    
    const usedValueIds = new Set(existingModifications.map(mod => mod.valueId));
    const availableValue = story.globalValues.find(value => !usedValueIds.has(value.id));
    
    if (!availableValue) return; // No unused values
    
    const newModification: ValueModification = {
      sceneId,
      sceneTitle,
      elementId,
      elementIndex,
      elementType,
      elementTitle,
      optionOrOutcome,
      outcomeType,
      valueId: availableValue.id,
      valueChange: 0,
      choiceOptionId
    };
    
    onModificationUpdate(newModification);
  };
  
  const handleRemoveValueChange = (modification: ValueModification) => {
    // Create a new modification with a special flag to indicate removal
    const removalModification = {
      ...modification,
      toRemove: true
    };
    
    onModificationUpdate(removalModification as ValueModification);
  };
  
  return {
    valueModifications,
    groupedModifications,
    handleValueChange,
    handleAddValueChange,
    handleRemoveValueChange,
    getDisplayValue,
    isEmpty: valueModifications.length === 0
  };
};
