
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChoiceOption } from "@/utils/types";

interface LockPriceSectionProps {
  option: ChoiceOption;
  onUpdateOption: (optionId: string, updates: Partial<ChoiceOption>) => void;
}

export const LockPriceSection: React.FC<LockPriceSectionProps> = ({
  option,
  onUpdateOption,
}) => {
  const handleUnlockPriceChange = (value: string) => {
    const price = value === '' ? undefined : Number(value);
    onUpdateOption(option.id, { unlockPrice: price });
  };

  return (
    <div>
      <Label className="text-xs mb-1 block">钻石解锁价格</Label>
      <Input
        type="number"
        min="0"
        placeholder="钻石数量"
        value={option.unlockPrice ?? ''}
        onChange={(e) => handleUnlockPriceChange(e.target.value)}
        className="h-7 text-xs"
      />
    </div>
  );
};

export default LockPriceSection;
