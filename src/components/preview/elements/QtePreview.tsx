
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Keyboard } from "lucide-react";
import { QteElement, ValueChange } from "@/utils/types";

interface QtePreviewProps {
  element: QteElement;
  handleChoiceSelect: (nextSceneId: string, valueChanges?: ValueChange[]) => void;
}

const QtePreview: React.FC<QtePreviewProps> = ({ element, handleChoiceSelect }) => {
  return (
    <div className="p-4">
      <p className="text-sm mb-3 font-bold text-amber-600">
        {element.introText || "Quick Time Event"}
      </p>
      <p className="text-sm mb-4">{element.description}</p>

      <div className="flex justify-between text-xs text-muted-foreground mb-3">
        <div className="flex items-center">
          <Keyboard className="h-3 w-3 mr-1" />
          <span>Key Sequence: {element.keySequence || "ABC"}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>Time: {element.timeLimit || 3}s</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button
          variant="default"
          size="sm"
          className="bg-green-600 hover:bg-green-700"
          onClick={() =>
            handleChoiceSelect(
              element.success.sceneId,
              element.success.valueChanges
            )
          }
        >
          Success
        </Button>
        <Button
          variant="default"
          size="sm"
          className="bg-red-600 hover:bg-red-700"
          onClick={() =>
            handleChoiceSelect(
              element.failure.sceneId,
              element.failure.valueChanges
            )
          }
        >
          Failure
        </Button>
      </div>
    </div>
  );
};

export default QtePreview;
