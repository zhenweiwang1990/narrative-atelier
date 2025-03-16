
// This file is no longer needed and can be replaced with a simple stub
// It's kept for now to avoid breaking imports, but can be removed later
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
