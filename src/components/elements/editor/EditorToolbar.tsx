
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import ElementTypeButtons from "../ElementTypeButtons";
import { useElementEditor } from "./ElementEditorContext";

interface EditorToolbarProps {
  isEndingScene: boolean;
  onSplitScene: () => void;
}

const EditorToolbar = ({ isEndingScene, onSplitScene }: EditorToolbarProps) => {
  const { onAddElement } = useElementEditor();

  return (
    <div className="flex gap-2 justify-between">
      <ElementTypeButtons onAddElement={onAddElement} />
      {!isEndingScene && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSplitScene}
          className="flex items-center gap-1"
        >
          <Scissors className="h-3.5 w-3.5" />
          拆分场景
        </Button>
      )}
    </div>
  );
};

export default EditorToolbar;
