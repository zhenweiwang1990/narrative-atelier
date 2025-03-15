
import { 
  Story, 
  SceneElement, 
  ChoiceElement, 
  ChoiceOption, 
  QteElement, 
  DialogueTaskElement,
  ElementOutcome,
  GlobalValue
} from "@/utils/types";

export interface ValueModification {
  sceneId: string;
  sceneTitle: string;
  elementId: string;
  elementIndex: number;
  elementType: string;
  elementTitle: string;
  optionOrOutcome: string;
  outcomeType: 'choice' | 'success' | 'failure';
  valueId: string;
  valueChange: number;
  choiceOptionId?: string;
  toRemove?: boolean;
}

export interface GlobalValuesModificationsTableProps {
  story: Story | null;
  onModificationUpdate: (modification: ValueModification) => void;
}
