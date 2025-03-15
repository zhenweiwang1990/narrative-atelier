
import { useState } from "react";
import { Character, CharacterGender, CharacterRole } from "@/utils/types";
import { useStory } from "@/contexts/StoryContext";
import { generateId } from "@/utils/storage";
import { toast } from "sonner";

// Mock voice samples data
export const VOICE_SAMPLES = [
  { id: "aria", name: "Aria", gender: "female", sampleUrl: "/voice-samples/aria-sample.mp3" },
  { id: "roger", name: "Roger", gender: "male", sampleUrl: "/voice-samples/roger-sample.mp3" },
  { id: "sarah", name: "Sarah", gender: "female", sampleUrl: "/voice-samples/sarah-sample.mp3" },
  { id: "george", name: "George", gender: "male", sampleUrl: "/voice-samples/george-sample.mp3" },
  { id: "laura", name: "Laura", gender: "female", sampleUrl: "/voice-samples/laura-sample.mp3" },
  { id: "callum", name: "Callum", gender: "male", sampleUrl: "/voice-samples/callum-sample.mp3" },
  { id: "river", name: "River", gender: "other", sampleUrl: "/voice-samples/river-sample.mp3" },
  { id: "liam", name: "Liam", gender: "male", sampleUrl: "/voice-samples/liam-sample.mp3" },
  { id: "charlotte", name: "Charlotte", gender: "female", sampleUrl: "/voice-samples/charlotte-sample.mp3" },
  { id: "daniel", name: "Daniel", gender: "male", sampleUrl: "/voice-samples/daniel-sample.mp3" },
];

export const useCharacterForm = () => {
  const { story, setStory } = useStory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [currentPlayingVoice, setCurrentPlayingVoice] = useState<string | null>(null);
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

  // 播放语音示例
  const handlePlayVoiceSample = (voiceId: string) => {
    // 检查是否播放中
    if (currentPlayingVoice === voiceId) {
      // 停止当前播放
      setCurrentPlayingVoice(null);
      return;
    }

    // 寻找语音样本
    const voiceSample = VOICE_SAMPLES.find(sample => sample.id === voiceId);
    
    if (!voiceSample) {
      toast.error("无法找到语音样本");
      return;
    }

    try {
      // 创建新的音频实例播放
      const audio = new Audio(voiceSample.sampleUrl);
      
      // 设置播放完毕事件
      audio.onended = () => {
        setCurrentPlayingVoice(null);
      };
      
      // 设置错误处理
      audio.onerror = () => {
        toast.error("语音样本播放失败");
        setCurrentPlayingVoice(null);
      };
      
      // 开始播放
      audio.play().then(() => {
        setCurrentPlayingVoice(voiceId);
      }).catch(error => {
        console.error("播放音频失败:", error);
        toast.error("语音样本播放失败");
      });
    } catch (error) {
      console.error("播放音频出错:", error);
      toast.error("语音样本播放失败");
    }
  };

  // 处理角色创建或更新
  const handleSaveCharacter = () => {
    if (!story || !setStory) return;

    // Process voice value - convert empty to undefined
    const processedVoice = formData.voice === "" ? undefined : formData.voice;
    const processedProfilePicture = formData.profilePicture === "" ? undefined : formData.profilePicture;
    const processedFullBody = formData.fullBody === "" ? undefined : formData.fullBody;

    if (isEditMode && selectedCharacterId) {
      // 更新现有角色
      const updatedCharacters = story.characters.map((character) => {
        if (character.id === selectedCharacterId) {
          return {
            ...character,
            ...formData,
            voice: processedVoice,
            profilePicture: processedProfilePicture,
            fullBody: processedFullBody
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
        profilePicture: processedProfilePicture,
        fullBody: processedFullBody,
        voice: processedVoice,
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
    currentPlayingVoice,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleInputChange,
    handleSelectChange,
    handleImageChange,
    handlePlayVoiceSample,
    handleSaveCharacter,
    handleDeleteCharacter,
  };
};
