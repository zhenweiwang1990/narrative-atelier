
import React from "react";
import {
  SceneElement,
  Character,
  ValueChange,
  GlobalValue,
  Title,
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
import ValuesDisplay from "./ValuesDisplay";

interface PreviewElementProps {
  currentElement: SceneElement | null;
  handleNext: () => void;
  handleChoiceSelect: (
    nextSceneId: string,
    valueChanges?: ValueChange[]
  ) => void;
  getCharacter: (characterId: string) => Character | undefined;
  globalValues?: GlobalValue[];
  titles?: Title[];
}

const PreviewElement: React.FC<PreviewElementProps> = ({
  currentElement,
  handleNext,
  handleChoiceSelect,
  getCharacter,
  globalValues = [],
  titles = [],
}) => {
  if (!currentElement) {
    return <DefaultPreview />;
  }

  switch (currentElement.type) {
    case "narration":
      return <NarrationPreview element={currentElement as any} />; // Using type assertion to fix TypeScript error

    case "dialogue":
      return <DialoguePreview element={currentElement as any} getCharacter={getCharacter} />; // Using type assertion to fix TypeScript error

    case "thought":
      return <ThoughtPreview element={currentElement as any} getCharacter={getCharacter} />; // Using type assertion to fix TypeScript error

    case "choice":
      return (
        <ChoicePreview 
          element={currentElement as any} 
          handleChoiceSelect={handleChoiceSelect} 
          globalValues={globalValues}
        />
      ); // Using type assertion to fix TypeScript error

    case "qte":
      return <QtePreview element={currentElement as any} handleChoiceSelect={handleChoiceSelect} />; // Using type assertion to fix TypeScript error

    case "dialogueTask":
      return <DialogueTaskPreview 
               element={currentElement as any} // Using type assertion to fix TypeScript error
               getCharacter={getCharacter}
               handleChoiceSelect={handleChoiceSelect} 
             />;
    default:
      return null;
  }
};

export default PreviewElement;
