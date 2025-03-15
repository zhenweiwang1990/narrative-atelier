
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
    <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-md border border-red-200 dark:border-red-800 my-2 animate-fade-in">
      <div className="flex items-center mb-3">
        <Clock className="h-4 w-4 text-red-600 mr-2" />
        <p className="text-xs font-medium text-red-600 dark:text-red-400">快速反应</p>
      </div>
      <p className="text-sm mb-2 font-bold text-amber-600 dark:text-amber-400">
        {element.introText || "Quick Time Event"}
      </p>
      <p className="text-sm mb-4 bg-white dark:bg-red-950/60 p-2 rounded-md border border-red-100 dark:border-red-900">{element.description}</p>

      <div className="flex justify-between text-xs text-muted-foreground mb-3 bg-white dark:bg-red-950/30 p-2 rounded border border-red-100 dark:border-red-900">
        <div className="flex items-center">
          <Keyboard className="h-3 w-3 mr-1 text-red-500" />
          <span>Key Sequence: {element.keySequence || "ABC"}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1 text-red-500" />
          <span>Time: {element.timeLimit || 3}s</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button
          variant="default"
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
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
          className="bg-red-600 hover:bg-red-700 text-white"
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
