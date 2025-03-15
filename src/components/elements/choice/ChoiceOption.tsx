
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { ChoiceOption as ChoiceOptionType, Scene, GlobalValue } from "@/utils/types";
import ValueChangeEditor from "./ValueChangeEditor";

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
  onOpenAiDialog: (type: 'branch' | 'ending', optionId: string) => void;
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
  onOpenAiDialog,
  disableDelete
}) => {
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

      <div>
        <Label className="text-xs">下一个场景</Label>
        <Select
          value={option.nextSceneId}
          onValueChange={(value) => onUpdateOption(option.id, { nextSceneId: value })}
        >
          <SelectTrigger className="mt-1 h-7 text-xs">
            <SelectValue placeholder="选择下一个场景" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {scenes.map((scene) => (
                <SelectItem key={scene.id} value={scene.id}>
                  {scene.title} (
                  {scene.type === "start"
                    ? "开始"
                    : scene.type === "ending"
                    ? "正常结局"
                    : scene.type === "bad-ending"
                    ? "异常结局"
                    : "普通"}
                  )
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 mt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-xs"
          onClick={() => onOpenAiDialog('branch', option.id)}
        >
          AI 写支线
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-xs"
          onClick={() => onOpenAiDialog('ending', option.id)}
        >
          AI 写结局
        </Button>
      </div>

      <ValueChangeEditor
        optionId={option.id}
        valueChanges={option.valueChanges}
        globalValues={globalValues}
        onAddValueChange={onAddValueChange}
        onUpdateValueChange={onUpdateValueChange}
        onRemoveValueChange={onRemoveValueChange}
      />
    </div>
  );
};

export default ChoiceOption;
