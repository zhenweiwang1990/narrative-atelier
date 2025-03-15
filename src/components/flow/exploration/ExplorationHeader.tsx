
import React from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface ExplorationHeaderProps {
  isGenerating: boolean;
  onGenerate: () => void;
}

const ExplorationHeader: React.FC<ExplorationHeaderProps> = ({
  isGenerating,
  onGenerate
}) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium">场景探索项</h3>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Wand2 className="h-4 w-4 mr-2 animate-spin" />
            生成中...
          </>
        ) : (
          <>
            <Wand2 className="h-4 w-4 mr-2" />
            AI 生成探索项
          </>
        )}
      </Button>
    </div>
  );
};

export default ExplorationHeader;
