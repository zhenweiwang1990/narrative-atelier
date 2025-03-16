
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ChoiceOption as ChoiceOptionType, Scene, GlobalValue } from "@/utils/types";
import ValueChangeEditor from "./ValueChangeEditor";
import LockSettingsSection from "./LockSettingsSection";
import SceneSelector from "./SceneSelector";
import AiStoryDialog from "../shared/AiStoryDialog";
import { toast } from "sonner";

interface ChoiceOptionProps {
  option: ChoiceOptionType;
  optIdx: number;
  scenes: Scene[];
  globalValues: GlobalValue[];
  onDeleteOption: (optionId: string) => void;
  onUpdateOption: (optionId: string, updates: Partial<ChoiceOptionType>) => void;
  onAddValueChange: (optionId: string) => void;
  onUpdateValueChange: (optionId: string, valueId: string, change: number) => void;
  onRemoveValueChange: (optionId: string, valueId: string) => void;
  disableDelete: boolean;
}

const ChoiceOption: React.FC<ChoiceOptionProps> = ({
  option,
  optIdx,
  scenes,
  globalValues,
  onDeleteOption,
  onUpdateOption,
  onAddValueChange,
  onUpdateValueChange,
  onRemoveValueChange,
  disableDelete
}) => {
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiDialogType, setAiDialogType] = useState<'branch' | 'ending'>('branch');

  const handleSceneChange = (value: string) => {
    if (value === "ai-branch") {
      setAiDialogType('branch');
      setAiDialogOpen(true);
    } else if (value === "ai-ending") {
      setAiDialogType('ending');
      setAiDialogOpen(true);
    } else {
      onUpdateOption(option.id, { nextSceneId: value });
    }
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
      optionId: option.id,
      prompt,
      convergenceSceneId,
      endingType
    });
  };

  return (
    <div className="p-2 border rounded-md bg-muted/20">
      <div className="flex justify-between items-start mb-1">
        <Label className="text-xs">选项 {optIdx + 1}</Label>

        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 text-destructive"
          onClick={() => onDeleteOption(option.id)}
          disabled={disableDelete}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      <Input
        value={option.text}
        onChange={(e) => onUpdateOption(option.id, { text: e.target.value })}
        className="mb-1 h-7 text-xs"
        placeholder="选项文本"
      />

      {/* Lock Settings Section */}
      <LockSettingsSection 
        option={option}
        globalValues={globalValues}
        onUpdateOption={onUpdateOption}
      />

      {/* Scene Selector */}
      <SceneSelector 
        nextSceneId={option.nextSceneId}
        scenes={scenes}
        onSceneChange={handleSceneChange}
      />

      {/* Value Change Editor */}
      <ValueChangeEditor
        optionId={option.id}
        valueChanges={option.valueChanges}
        globalValues={globalValues}
        onAddValueChange={onAddValueChange}
        onUpdateValueChange={onUpdateValueChange}
        onRemoveValueChange={onRemoveValueChange}
      />

      {/* AI Story Dialog */}
      <AiStoryDialog 
        isOpen={aiDialogOpen}
        onClose={() => setAiDialogOpen(false)}
        onSubmit={handleAiStorySubmit}
        type={aiDialogType}
        scenes={scenes}
        showConvergenceSelector={aiDialogType === 'branch'}
      />
    </div>
  );
};

export default ChoiceOption;
