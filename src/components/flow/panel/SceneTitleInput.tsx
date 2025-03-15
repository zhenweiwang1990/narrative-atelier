
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SceneTitleInputProps {
  title: string;
  updateSceneTitle: (newTitle: string) => void;
}

const SceneTitleInput: React.FC<SceneTitleInputProps> = ({ title, updateSceneTitle }) => {
  return (
    <div>
      <Label htmlFor="title" className="text-xs">
        标题
      </Label>
      <Input
        id="title"
        value={title}
        onChange={(e) => updateSceneTitle(e.target.value)}
        className="h-8 text-sm"
      />
    </div>
  );
};

export default SceneTitleInput;
