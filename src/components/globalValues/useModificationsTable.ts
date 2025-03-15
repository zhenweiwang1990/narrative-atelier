
import { useMemo, useState } from "react";
import { ValueModification } from "./types";
import { extractValueModifications } from "./tableUtils";
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
  }, [valueModifications]);
  
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
  
  return {
    valueModifications,
    groupedModifications,
    handleValueChange,
    getDisplayValue,
    isEmpty: valueModifications.length === 0
  };
};
