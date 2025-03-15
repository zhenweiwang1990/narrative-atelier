
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ChoiceElement as ChoiceElementType,
  ChoiceOption as ChoiceOptionType,
  Scene,
  GlobalValue,
  ValueChange,
} from "@/utils/types";
import { Plus } from "lucide-react";
import ChoiceOption from "./choice/ChoiceOption";
import AiStoryDialog from "./shared/AiStoryDialog";
import { toast } from "sonner";

interface ChoiceElementProps {
  element: ChoiceElementType;
  scenes: Scene[];
  globalValues: GlobalValue[];
  onUpdate: (id: string, updates: Partial<ChoiceElementType>) => void;
  onAddOption: (elementId: string) => void;
  onDeleteOption: (elementId: string, optionId: string) => void;
  onUpdateOption: (
    elementId: string,
    optionId: string,
    updates: Partial<ChoiceOptionType>
  ) => void;
}

export const ChoiceElement: React.FC<ChoiceElementProps> = ({
  element,
  scenes,
  globalValues,
  onUpdate,
  onAddOption,
  onDeleteOption,
  onUpdateOption,
}) => {
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiDialogType, setAiDialogType] = useState<'branch' | 'ending'>('branch');
  const [currentOptionId, setCurrentOptionId] = useState<string | null>(null);

  const addValueChange = (optionId: string) => {
    const option = element.options.find((o) => o.id === optionId);
    if (!option) return;

    const currentChanges = option.valueChanges || [];
    const unusedValues = globalValues.filter(
      (value) => !currentChanges.some((change) => change.valueId === value.id)
    );

    if (unusedValues.length === 0) return;

    const newValueChange: ValueChange = {
      valueId: unusedValues[0].id,
      change: 1,
    };

    onUpdateOption(element.id, optionId, {
      valueChanges: [...currentChanges, newValueChange],
    });
  };

  const updateValueChange = (
    optionId: string,
    valueId: string,
    change: number
  ) => {
    const option = element.options.find((o) => o.id === optionId);
    if (!option || !option.valueChanges) return;

    const updatedChanges = option.valueChanges.map((vc) =>
      vc.valueId === valueId ? { ...vc, change } : vc
    );

    onUpdateOption(element.id, optionId, {
      valueChanges: updatedChanges,
    });
  };

  const removeValueChange = (optionId: string, valueId: string) => {
    const option = element.options.find((o) => o.id === optionId);
    if (!option || !option.valueChanges) return;

    const updatedChanges = option.valueChanges.filter(
      (vc) => vc.valueId !== valueId
    );

    onUpdateOption(element.id, optionId, {
      valueChanges: updatedChanges,
    });
  };

  const handleOpenAiDialog = (type: 'branch' | 'ending', optionId: string) => {
    setAiDialogType(type);
    setCurrentOptionId(optionId);
    setAiDialogOpen(true);
  };

  const handleAiStorySubmit = (prompt: string, convergenceSceneId?: string) => {
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
      optionId: currentOptionId,
      prompt,
      convergenceSceneId,
      elementId: element.id
    });
  };

  return (
    <div className="space-y-2">
      <div>
        <Label className="text-xs">描述</Label>
        <Textarea
          value={element.text}
          onChange={(e) => onUpdate(element.id, { text: e.target.value })}
          className="mt-1 text-sm"
          rows={2}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <Label className="text-xs">选项</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAddOption(element.id)}
            disabled={element.options.length >= 3}
            className="h-6 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" /> 添加
          </Button>
        </div>

        <div className="space-y-2">
          {element.options.map((option, optIdx) => (
            <ChoiceOption
              key={option.id}
              option={option}
              optIdx={optIdx}
              scenes={scenes}
              globalValues={globalValues}
              onDeleteOption={(optionId) => onDeleteOption(element.id, optionId)}
              onUpdateOption={(optionId, updates) => onUpdateOption(element.id, optionId, updates)}
              onAddValueChange={addValueChange}
              onUpdateValueChange={updateValueChange}
              onRemoveValueChange={removeValueChange}
              onOpenAiDialog={handleOpenAiDialog}
              disableDelete={element.options.length <= 1}
            />
          ))}
        </div>
      </div>

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
