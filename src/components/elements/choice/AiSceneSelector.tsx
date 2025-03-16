
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand } from "lucide-react";
import { Scene } from "@/utils/types";
import AiStoryDialog from "../shared/AiStoryDialog";
import { toast } from "sonner";

interface AiSceneSelectorProps {
  nextSceneId: string | undefined;
  onAiSceneSelect: (type: 'branch' | 'ending') => void;
  scenes: Scene[];
}

const AiSceneSelector: React.FC<AiSceneSelectorProps> = ({
  nextSceneId,
  onAiSceneSelect,
  scenes
}) => {
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiDialogType, setAiDialogType] = useState<'branch' | 'ending'>('branch');

  const handleAiDialogOpen = (type: 'branch' | 'ending') => {
    setAiDialogType(type);
    setAiDialogOpen(true);
  };

  const handleAiStorySubmit = (prompt: string, convergenceSceneId?: string, endingType?: 'normal' | 'bad') => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)), 
      {
        loading: aiDialogType === 'branch' ? '正在生成支线...' : '正在生成结局...',
        success: aiDialogType === 'branch' ? 'AI 支线生成成功！' : 'AI 结局生成成功！',
        error: '生成失败，请重试。',
      }
    );

    console.log('AI Story Request for Choice Option:', {
      type: aiDialogType,
      prompt,
      convergenceSceneId,
      endingType
    });
  };

  // Only render AI buttons when no scene is selected
  if (nextSceneId && nextSceneId !== "none") {
    return null;
  }

  return (
    <>
      <div className="flex gap-1 mt-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1 text-xs flex-1 text-blue-600"
          onClick={() => handleAiDialogOpen('branch')}
        >
          <Wand className="h-3 w-3" />
          AI 写支线
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1 text-xs flex-1 text-purple-600"
          onClick={() => handleAiDialogOpen('ending')}
        >
          <Wand className="h-3 w-3" />
          AI 写结局
        </Button>
      </div>

      <AiStoryDialog 
        isOpen={aiDialogOpen}
        onClose={() => setAiDialogOpen(false)}
        onSubmit={handleAiStorySubmit}
        type={aiDialogType}
        scenes={scenes}
        showConvergenceSelector={aiDialogType === 'branch'}
      />
    </>
  );
};

export default AiSceneSelector;
