
// 此文件不再需要，可以替换为简单的存根
// 它被保留以避免破坏导入，但以后可以删除
import React from "react";
import { ChoiceOption, GlobalValue } from "@/utils/types";

interface LockSettingsProps {
  option: ChoiceOption;
  globalValues: GlobalValue[];
  onUpdateOption: (optionId: string, updates: Partial<ChoiceOption>) => void;
}

const LockSettingsSection: React.FC<LockSettingsProps> = () => {
  return null;
};

export default LockSettingsSection;
