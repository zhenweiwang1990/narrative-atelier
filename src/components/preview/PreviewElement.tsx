
import React from "react";
import {
  SceneElement,
  Character,
  ValueChange,
} from "@/utils/types";
import {
  NarrationPreview,
  DialoguePreview,
  ThoughtPreview,
  ChoicePreview,
  QtePreview,
  DialogueTaskPreview,
  DefaultPreview
} from "./elements";

interface PreviewElementProps {
  currentElement: SceneElement | null;
  handleNext: () => void;
  handleChoiceSelect: (
    nextSceneId: string,
    valueChanges?: ValueChange[]
  ) => void;
  getCharacter: (characterId: string) => Character | undefined;
}

const PreviewElement: React.FC<PreviewElementProps> = ({
  currentElement,
  handleNext,
  handleChoiceSelect,
  getCharacter,
}) => {
  if (!currentElement) {
    return <DefaultPreview />;
  }

  switch (currentElement.type) {
    case "narration":
      return <NarrationPreview element={currentElement as any} />;

    case "dialogue":
      return <DialoguePreview element={currentElement as any} getCharacter={getCharacter} />;

    case "thought":
      return <ThoughtPreview element={currentElement as any} getCharacter={getCharacter} />;

    case "choice":
      return <ChoicePreview element={currentElement as any} handleChoiceSelect={handleChoiceSelect} />;

    case "qte":
      return <QtePreview element={currentElement as any} handleChoiceSelect={handleChoiceSelect} />;

    case "dialogueTask":
      return <DialogueTaskPreview 
               element={currentElement as any} 
               getCharacter={getCharacter}
               handleChoiceSelect={handleChoiceSelect} 
             />;
    default:
      return null;
  }
};

export default PreviewElement;
