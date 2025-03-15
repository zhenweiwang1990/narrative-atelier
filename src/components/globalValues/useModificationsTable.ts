
import { useMemo, useState } from "react";
import { ValueModification } from "./types";
import { extractValueModifications } from "./tableUtils";
import { Story } from "@/utils/types";

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
  
  const handleValueChange = (modification: ValueModification, newValue: string) => {
    const numericValue = parseInt(newValue) || 0;
    const modificationKey = `${modification.sceneId}-${modification.elementId}-${modification.valueId}-${modification.outcomeType}-${modification.choiceOptionId || ''}`;
    
    setEditedValues({
      ...editedValues,
      [modificationKey]: numericValue
    });
    
    onModificationUpdate({
      ...modification,
      valueChange: numericValue
    });
  };
  
  const getDisplayValue = (modification: ValueModification): number => {
    const modificationKey = `${modification.sceneId}-${modification.elementId}-${modification.valueId}-${modification.outcomeType}-${modification.choiceOptionId || ''}`;
    return editedValues[modificationKey] !== undefined 
      ? editedValues[modificationKey] 
      : modification.valueChange;
  };
  
  return {
    valueModifications,
    handleValueChange,
    getDisplayValue,
    isEmpty: valueModifications.length === 0
  };
};
