
import React, { useState } from "react";
import { useStory } from "@/components/Layout";
import CharacterCard from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, User } from "lucide-react";
import { Character, CharacterGender, CharacterRole } from "@/utils/types";
import { generateId } from "@/utils/storage";

const Characters = () => {
  const { story, setStory } = useStory();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<Character>>({
    name: "",
    gender: "male",
    role: "supporting",
    bio: "",
    profilePicture: "",
    fullBody: "",
  });

  // 获取选中的角色用于编辑
  const selectedCharacter =
    story?.characters.find((c) => c.id === selectedCharacterId) || null;

  // 根据搜索查询过滤角色
  const filteredCharacters =
    story?.characters.filter(
      (character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.bio.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

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

  if (!story) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">角色</h1>
          <p className="text-sm text-muted-foreground">
            管理您剧情中的角色及其属性。
          </p>
        </div>

        <Button size="sm" onClick={handleOpenCreateDialog}>
          <Plus className="h-4 w-4 mr-2" /> 添加角色
        </Button>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索角色..."
            className="pl-9 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>名称</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>性别</TableHead>
              <TableHead className="hidden md:table-cell">简介</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCharacters.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-32 text-muted-foreground"
                >
                  未找到角色。添加您的第一个角色以开始。
                </TableCell>
              </TableRow>
            ) : (
              filteredCharacters.map((character) => (
                <TableRow key={character.id}>
                  <TableCell>
                    {character.profilePicture ? (
                      <img
                        src={character.profilePicture}
                        alt={character.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {character.name}
                  </TableCell>
                  <TableCell className="capitalize">
                    {character.role === "protagonist" ? "主角" : "配角"}
                  </TableCell>
                  <TableCell className="capitalize">
                    {character.gender === "male"
                      ? "男"
                      : character.gender === "female"
                      ? "女"
                      : "其他"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm truncate max-w-[300px]">
                    {character.bio}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEditDialog(character)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCharacter(character.id)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">角色类型</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleSelectChange("role", value)}
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
                onValueChange={(value) => handleSelectChange("gender", value)}
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
              <Label htmlFor="bio">人物传记</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
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
                    onImageChange={(url, type) => handleImageChange(url, type)}
                    onConfirmEdit={() => {}}
                    onCancelEdit={() => {}}
                  />
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" onClick={handleSaveCharacter}>
              {isEditMode ? "更新角色" : "创建角色"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Characters;
