
import React from "react";
import { Button } from "@/components/ui/button";
import { ChoiceElement, ValueChange } from "@/utils/types";

interface ChoicePreviewProps {
  element: ChoiceElement;
  handleChoiceSelect: (nextSceneId: string, valueChanges?: ValueChange[]) => void;
}

const ChoicePreview: React.FC<ChoicePreviewProps> = ({ element, handleChoiceSelect }) => {
  return (
    <div className="p-4">
      <p className="text-sm mb-3">{element.text}</p>
      <div className="space-y-2">
        {element.options.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            size="sm"
            className="w-full justify-start text-left h-auto py-2 text-sm"
            onClick={() =>
              handleChoiceSelect(option.nextSceneId, option.valueChanges)
            }
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChoicePreview;
