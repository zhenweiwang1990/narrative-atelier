
import React from "react";
import { Button } from "@/components/ui/button";
import { ChoiceElement, ValueChange } from "@/utils/types";
import { List } from "lucide-react";

interface ChoicePreviewProps {
  element: ChoiceElement;
  handleChoiceSelect: (nextSceneId: string, valueChanges?: ValueChange[]) => void;
}

const ChoicePreview: React.FC<ChoicePreviewProps> = ({ element, handleChoiceSelect }) => {
  return (
    <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-md border border-amber-200 dark:border-amber-800 my-2 animate-fade-in">
      <div className="flex items-center mb-3">
        <List className="h-4 w-4 text-amber-600 mr-2" />
        <p className="text-xs font-medium text-amber-600 dark:text-amber-400">选择</p>
      </div>
      <p className="text-sm mb-3 bg-white dark:bg-amber-950/60 p-2 rounded-md border border-amber-100 dark:border-amber-900">{element.text}</p>
      <div className="space-y-2 mt-3">
        {element.options.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            size="sm"
            className="w-full justify-start text-left h-auto py-2 text-sm bg-white dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors"
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
