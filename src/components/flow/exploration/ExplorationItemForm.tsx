
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, X } from "lucide-react";
import { ExplorationItem } from "@/utils/types";

interface ExplorationItemFormProps {
  type: "item" | "knowledge";
  editingItem: ExplorationItem | null;
  name: string;
  description: string;
  isCollectible: boolean;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCollectibleChange: (value: boolean) => void;
  onCancel: () => void;
  onSave: () => void;
}

const ExplorationItemForm: React.FC<ExplorationItemFormProps> = ({
  type,
  editingItem,
  name,
  description,
  isCollectible,
  onNameChange,
  onDescriptionChange,
  onCollectibleChange,
  onCancel,
  onSave
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">
          {editingItem ? `编辑${type === "item" ? "物品" : "知识"}` : `添加${type === "item" ? "物品" : "知识"}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid w-full gap-1.5">
          <Label htmlFor={`${type}-name`}>{type === "item" ? "物品" : "知识"}名称</Label>
          <Input 
            id={`${type}-name`} 
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={`输入${type === "item" ? "物品" : "知识"}名称`} 
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor={`${type}-description`}>{type === "item" ? "物品" : "知识"}描述</Label>
          <Textarea 
            id={`${type}-description`} 
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder={`输入${type === "item" ? "物品" : "知识"}的详细描述`}
            rows={3}
          />
        </div>
        {type === "item" && (
          <div className="flex items-center space-x-2 pt-2">
            <Switch 
              id="item-collectible"
              checked={isCollectible}
              onCheckedChange={onCollectibleChange}
            />
            <Label htmlFor="item-collectible">允许收集</Label>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          取消
        </Button>
        <Button size="sm" onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          保存
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExplorationItemForm;
