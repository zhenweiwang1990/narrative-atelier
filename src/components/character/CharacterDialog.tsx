
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Character } from "@/utils/types";
import VoiceSelector from "./VoiceSelector";

interface CharacterDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditMode: boolean;
  formData: Partial<Character>;
  selectedCharacter: Character | null;
  currentPlayingVoice: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onImageChange: (imageUrl: string, type: 'profilePicture' | 'fullBody') => void;
  onPlayVoiceSample: (voiceId: string) => void;
  onSave: () => void;
}

const CharacterDialog: React.FC<CharacterDialogProps> = ({
  isOpen,
  onOpenChange,
  isEditMode,
  formData,
  selectedCharacter,
  currentPlayingVoice,
  onInputChange,
  onSelectChange,
  onImageChange,
  onPlayVoiceSample,
  onSave,
}) => {
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
              <Label htmlFor="role" className="block mb-2">角色类型</Label>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="role-protagonist" 
                  checked={formData.role === "protagonist"}
                  onCheckedChange={(checked) => {
                    onSelectChange("role", checked ? "protagonist" : "supporting");
                  }}
                />
                <Label 
                  htmlFor="role-protagonist" 
                  className="text-sm cursor-pointer"
                >
                  主角
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="block mb-2">性别</Label>
            <RadioGroup
              value={formData.gender || "male"}
              onValueChange={(value) => onSelectChange("gender", value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="gender-male" />
                <Label htmlFor="gender-male" className="cursor-pointer">男</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="gender-female" />
                <Label htmlFor="gender-female" className="cursor-pointer">女</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="gender-other" />
                <Label htmlFor="gender-other" className="cursor-pointer">其他</Label>
              </div>
            </RadioGroup>
          </div>

          <VoiceSelector 
            selectedVoice={formData.voice || "none"}
            gender={formData.gender || ""}
            currentPlayingVoice={currentPlayingVoice}
            onSelectChange={onSelectChange}
            onPlayVoiceSample={onPlayVoiceSample}
          />

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
