
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChoiceOption as ChoiceOptionType, Scene, GlobalValue } from "@/utils/types";
import ValueChangeEditor from "./ValueChangeEditor";
import LockSettingsSection from "./LockSettingsSection";
import SceneSelector from "./SceneSelector";
import AiStoryDialog from "../shared/AiStoryDialog";
import OptionHeader from "./OptionHeader";
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

  const toggleLocked = () => {
    onUpdateOption(option.id, { 
      locked: !option.locked,
      // Initialize unlock conditions with defaults if turning on lock
      unlockConditions: !option.locked && !option.unlockConditions 
        ? [] 
        : option.unlockConditions
    });
  };

  return (
    <div className="p-3 border rounded-md bg-muted/20">
      <OptionHeader 
        optIdx={optIdx}
        onDelete={() => onDeleteOption(option.id)}
        disableDelete={disableDelete}
        isLocked={!!option.locked}
        onLockToggle={toggleLocked}
      />

      <Input
        value={option.text}
        onChange={(e) => onUpdateOption(option.id, { text: e.target.value })}
        className="mb-2 h-7 text-xs"
        placeholder="选项文本"
      />

      <div className="grid grid-cols-2 gap-2 mt-3">
        {/* Scene Selector */}
        <div className="bg-background/60 p-2 rounded-md">
          <SceneSelector 
            nextSceneId={option.nextSceneId}
            scenes={scenes}
            onSceneChange={handleSceneChange}
          />
        </div>

        {/* Value Change Editor */}
        <div className="bg-background/60 p-2 rounded-md">
          <ValueChangeEditor
            optionId={option.id}
            valueChanges={option.valueChanges}
            globalValues={globalValues}
            onAddValueChange={onAddValueChange}
            onUpdateValueChange={onUpdateValueChange}
            onRemoveValueChange={onRemoveValueChange}
          />
        </div>

        {/* Lock Price Settings - only show when locked */}
        {option.locked && (
          <div className="bg-amber-50/50 dark:bg-amber-950/20 p-2 rounded-md border border-amber-200 dark:border-amber-800">
            <LockPriceSection 
              option={option}
              onUpdateOption={onUpdateOption}
            />
          </div>
        )}

        {/* Lock Conditions - only show when locked */}
        {option.locked && (
          <div className="bg-amber-50/50 dark:bg-amber-950/20 p-2 rounded-md border border-amber-200 dark:border-amber-800">
            <UnlockConditionsEditor
              unlockConditions={option.unlockConditions}
              globalValues={globalValues}
              onAddCondition={() => {
                if (!globalValues.length) return;
                
                const currentConditions = option.unlockConditions || [];
                const defaultCondition = {
                  valueId: globalValues[0].id,
                  operator: 'gte',
                  targetValue: 1
                };
                
                onUpdateOption(option.id, { 
                  unlockConditions: [...currentConditions, defaultCondition] 
                });
              }}
              onUpdateCondition={(index, updates) => {
                const currentConditions = [...(option.unlockConditions || [])];
                currentConditions[index] = { ...currentConditions[index], ...updates };
                
                onUpdateOption(option.id, { unlockConditions: currentConditions });
              }}
              onRemoveCondition={(index) => {
                const currentConditions = [...(option.unlockConditions || [])];
                currentConditions.splice(index, 1);
                
                onUpdateOption(option.id, { unlockConditions: currentConditions });
              }}
            />
          </div>
        )}
      </div>

      {option.locked && !option.unlockPrice && (!option.unlockConditions || option.unlockConditions.length === 0) && (
        <p className="text-xs text-amber-600 mt-2">
          警告：此选项已锁定但未设置任何解锁条件，将无法被选择
        </p>
      )}

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
