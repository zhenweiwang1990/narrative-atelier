
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Lock, Unlock } from "lucide-react";
import { UnlockCondition, GlobalValue, ChoiceOption } from "@/utils/types";
import UnlockConditionsEditor from "./UnlockConditionsEditor";

interface LockSettingsProps {
  option: ChoiceOption;
  globalValues: GlobalValue[];
  onUpdateOption: (optionId: string, updates: Partial<ChoiceOption>) => void;
}

const LockSettingsSection: React.FC<LockSettingsProps> = ({
  option,
  globalValues,
  onUpdateOption,
}) => {
  const toggleLocked = () => {
    onUpdateOption(option.id, { 
      locked: !option.locked,
      // Initialize unlock conditions with defaults if turning on lock
      unlockConditions: !option.locked && !option.unlockConditions 
        ? [] 
        : option.unlockConditions
    });
  };

  const handleUnlockPriceChange = (value: string) => {
    const price = value === '' ? undefined : Number(value);
    onUpdateOption(option.id, { unlockPrice: price });
  };

  const addUnlockCondition = () => {
    if (!globalValues.length) return;
    
    const currentConditions = option.unlockConditions || [];
    const defaultCondition: UnlockCondition = {
      valueId: globalValues[0].id,
      operator: 'gte',
      targetValue: 1
    };
    
    onUpdateOption(option.id, { 
      unlockConditions: [...currentConditions, defaultCondition] 
    });
  };

  const updateUnlockCondition = (index: number, updates: Partial<UnlockCondition>) => {
    const currentConditions = [...(option.unlockConditions || [])];
    currentConditions[index] = { ...currentConditions[index], ...updates };
    
    onUpdateOption(option.id, { unlockConditions: currentConditions });
  };

  const removeUnlockCondition = (index: number) => {
    const currentConditions = [...(option.unlockConditions || [])];
    currentConditions.splice(index, 1);
    
    onUpdateOption(option.id, { unlockConditions: currentConditions });
  };

  return (
    <>
      <div className="flex items-center justify-between mt-2 mb-1">
        <div className="flex items-center space-x-2">
          {option.locked ? <Lock className="h-3 w-3 text-amber-500" /> : <Unlock className="h-3 w-3 text-green-500" />}
          <Label className="text-xs" htmlFor={`locked-${option.id}`}>
            {option.locked ? "锁定选项" : "未锁定"}
          </Label>
        </div>
        <Switch
          id={`locked-${option.id}`}
          checked={!!option.locked}
          onCheckedChange={toggleLocked}
          className="h-5 w-9"
        />
      </div>

      {option.locked && (
        <div className="mt-2 mb-2 p-2 border rounded-md bg-amber-50 dark:bg-amber-950/20">
          <div>
            <Label className="text-xs mb-1 block">钻石解锁价格</Label>
            <Input
              type="number"
              min="0"
              placeholder="钻石数量"
              value={option.unlockPrice ?? ''}
              onChange={(e) => handleUnlockPriceChange(e.target.value)}
              className="h-7 text-xs mb-2"
            />
          </div>

          {/* 解锁条件编辑器 */}
          <UnlockConditionsEditor
            unlockConditions={option.unlockConditions}
            globalValues={globalValues}
            onAddCondition={addUnlockCondition}
            onUpdateCondition={updateUnlockCondition}
            onRemoveCondition={removeUnlockCondition}
          />

          {!option.unlockPrice && (!option.unlockConditions || option.unlockConditions.length === 0) && (
            <p className="text-xs text-amber-600 mt-2">
              警告：此选项已锁定但未设置任何解锁条件，将无法被选择
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default LockSettingsSection;
