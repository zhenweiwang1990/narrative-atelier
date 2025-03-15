
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { GlobalValue, ValueChange } from "@/utils/types";

interface ValueChangeEditorProps {
  optionId: string;
  valueChanges: ValueChange[] | undefined;
  globalValues: GlobalValue[];
  onAddValueChange: (optionId: string) => void;
  onUpdateValueChange: (optionId: string, valueId: string, change: number) => void;
  onRemoveValueChange: (optionId: string, valueId: string) => void;
}

const ValueChangeEditor: React.FC<ValueChangeEditorProps> = ({
  optionId,
  valueChanges = [],
  globalValues,
  onAddValueChange,
  onUpdateValueChange,
  onRemoveValueChange,
}) => {
  if (globalValues.length === 0) return null;

  return (
    <Collapsible className="mt-2">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-xs py-1">
        <span className="font-medium">数值变化</span>
        <ChevronDown className="h-3 w-3" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        {valueChanges && valueChanges.length > 0 ? (
          <div className="space-y-2">
            {valueChanges.map((valueChange) => {
              const value = globalValues.find(
                (v) => v.id === valueChange.valueId
              );
              return (
                <div
                  key={valueChange.valueId}
                  className="flex items-center gap-2"
                >
                  <div className="flex-1">
                    <Select
                      value={valueChange.valueId}
                      onValueChange={(newValueId) => {
                        onRemoveValueChange(optionId, valueChange.valueId);
                        onUpdateValueChange(optionId, newValueId, valueChange.change);
                      }}
                    >
                      <SelectTrigger className="h-7 text-xs">
                        <SelectValue placeholder="选择数值" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {globalValues.map((v) => (
                            <SelectItem key={v.id} value={v.id}>
                              {v.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-20">
                    <Input
                      type="number"
                      value={valueChange.change}
                      onChange={(e) =>
                        onUpdateValueChange(
                          optionId,
                          valueChange.valueId,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="h-7 text-xs"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveValueChange(optionId, valueChange.valueId)}
                    className="h-7 w-7 text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            未定义数值变化。
          </p>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddValueChange(optionId)}
          className="mt-2 h-7 text-xs w-full"
          disabled={valueChanges ? valueChanges.length >= globalValues.length : false}
        >
          <Plus className="h-3 w-3 mr-1" /> 添加数值变化
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ValueChangeEditor;
