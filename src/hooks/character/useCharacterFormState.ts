
import { useState } from "react";
import { Character, CharacterGender, CharacterRole } from "@/utils/types";

export const useCharacterFormState = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Character>>({
    name: "",
    gender: "male",
    role: "supporting",
    bio: "",
    profilePicture: "",
    fullBody: "",
    voice: "",
  });

  // 处理表单输入变化
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 处理选择变化
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 处理图片变更
  const handleImageChange = (imageUrl: string, type: 'profilePicture' | 'fullBody') => {
    setFormData((prev) => ({ ...prev, [type]: imageUrl }));
  };

  // 打开创建角色对话框
  const handleOpenCreateDialog = () => {
    setIsEditMode(false);
    setFormData({
      name: "",
      gender: "male",
      role: "supporting",
      bio: "",
      profilePicture: "",
      fullBody: "",
      voice: "",
    });
    setIsDialogOpen(true);
  };

  // 打开编辑角色对话框
  const handleOpenEditDialog = (character: Character) => {
    setIsEditMode(true);
    setSelectedCharacterId(character.id);
    setFormData({
      name: character.name,
      gender: character.gender,
      role: character.role,
      bio: character.bio,
      profilePicture: character.profilePicture || "",
      fullBody: character.fullBody || "",
      voice: character.voice || "",
    });
    setIsDialogOpen(true);
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    isEditMode,
    setIsEditMode,
    selectedCharacterId,
    setSelectedCharacterId,
    formData,
    setFormData,
    handleInputChange,
    handleSelectChange,
    handleImageChange,
    handleOpenCreateDialog,
    handleOpenEditDialog
  };
};
