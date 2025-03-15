
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Character } from "@/utils/types";
import CharacterCard from "../CharacterCard";

// TODO: Replace with actual voice data from API
const MOCK_VOICES = [
  { id: "aria", name: "Aria", gender: "female" },
  { id: "roger", name: "Roger", gender: "male" },
  { id: "sarah", name: "Sarah", gender: "female" },
  { id: "george", name: "George", gender: "male" },
  { id: "laura", name: "Laura", gender: "female" },
  { id: "callum", name: "Callum", gender: "male" },
  { id: "river", name: "River", gender: "other" },
  { id: "liam", name: "Liam", gender: "male" },
  { id: "charlotte", name: "Charlotte", gender: "female" },
  { id: "daniel", name: "Daniel", gender: "male" },
];

interface CharacterDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  formData: Partial<Character>;
  selectedCharacter: Character | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onImageChange: (imageUrl: string, type: 'profilePicture' | 'fullBody') => void;
  onSave: () => void;
}

const CharacterDialog: React.FC<CharacterDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  formData,
  selectedCharacter,
  onInputChange,
  onSelectChange,
  onImageChange,
  onSave,
}) => {
  // 基于角色性别筛选音色
  const filteredVoices = formData.gender 
    ? MOCK_VOICES.filter(voice => voice.gender === formData.gender || voice.gender === 'other')
    : MOCK_VOICES;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "编辑角色" : "创建角色"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">名称</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={onInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">角色类型</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => onSelectChange("role", value)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="选择角色类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="protagonist">主角</SelectItem>
                  <SelectItem value="supporting">配角</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">性别</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => onSelectChange("gender", value)}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="选择性别" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">男</SelectItem>
                <SelectItem value="female">女</SelectItem>
                <SelectItem value="other">其他</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="voice">音色</Label>
            <Select
              value={formData.voice || "none"}
              onValueChange={(value) => onSelectChange("voice", value === "none" ? "" : value)}
            >
              <SelectTrigger id="voice">
                <SelectValue placeholder="选择角色音色" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">默认音色</SelectItem>
                {filteredVoices.map(voice => (
                  <SelectItem key={voice.id} value={voice.id}>
                    {voice.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">人物传记</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={onInputChange}
              rows={4}
              placeholder="角色背景和个性描述..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {isEditMode && selectedCharacter && (
                <CharacterCard 
                  character={selectedCharacter}
                  isEditing={true}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onImageChange={(url, type) => onImageChange(url, type)}
                  onConfirmEdit={() => {}}
                  onCancelEdit={() => {}}
                />
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={onSave}>
            {isEditMode ? "更新角色" : "创建角色"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterDialog;
