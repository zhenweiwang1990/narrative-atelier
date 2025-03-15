
import { useStory } from "@/components/Layout";
import { Character, CharacterGender, CharacterRole } from "@/utils/types";
import { generateId } from "@/utils/storage";

export const useCharacterOperations = () => {
  const { story, setStory } = useStory();

  // 处理角色创建或更新
  const handleSaveCharacter = (
    isEditMode: boolean,
    selectedCharacterId: string | null, 
    formData: Partial<Character>
  ) => {
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

  // 获取选中的角色
  const getSelectedCharacter = (characterId: string | null) => {
    if (!story || !characterId) return null;
    return story.characters.find((c) => c.id === characterId) || null;
  };

  return {
    handleSaveCharacter,
    handleDeleteCharacter,
    getSelectedCharacter
  };
};
