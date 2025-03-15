
import { useState } from "react";
import { Character, CharacterGender, CharacterRole } from "@/utils/types";
import { useStory } from "@/components/Layout";
import { generateId } from "@/utils/storage";

export const useCharacterForm = () => {
  const { story, setStory } = useStory();
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

  // 获取选中的角色用于编辑
  const selectedCharacter =
    story?.characters.find((c) => c.id === selectedCharacterId) || null;

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

  // 处理角色创建或更新
  const handleSaveCharacter = () => {
    if (!story || !setStory) return;

    if (isEditMode && selectedCharacterId) {
      // 更新现有角色
      const updatedCharacters = story.characters.map((character) => {
        if (character.id === selectedCharacterId) {
          return {
            ...character,
            ...formData,
          } as Character;
        }
        return character;
      });

      setStory({
        ...story,
        characters: updatedCharacters,
      });
    } else {
      // 创建新角色
      const newCharacter: Character = {
        id: generateId("character"),
        name: formData.name || "新角色",
        gender: (formData.gender as CharacterGender) || "male",
        role: (formData.role as CharacterRole) || "supporting",
        bio: formData.bio || "",
        profilePicture: formData.profilePicture || undefined,
        fullBody: formData.fullBody || undefined,
        voice: formData.voice || undefined,
      };

      setStory({
        ...story,
        characters: [...story.characters, newCharacter],
      });
    }

    setIsDialogOpen(false);
  };

  // 处理角色删除
  const handleDeleteCharacter = (characterId: string) => {
    if (!story || !setStory) return;

    setStory({
      ...story,
      characters: story.characters.filter(
        (character) => character.id !== characterId
      ),
    });
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    isEditMode,
    formData,
    selectedCharacter,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleInputChange,
    handleSelectChange,
    handleImageChange,
    handleSaveCharacter,
    handleDeleteCharacter,
  };
};
