
import { useState } from "react";
import { Location } from "@/utils/types";
import { useStory } from "@/components/Layout";
import { generateId } from "@/utils/storage";

export const useLocationForm = () => {
  const { story, setStory } = useStory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<Location>>({
    name: "",
    description: "",
    background: "",
    scenes: [],
  });

  // 获取选中的场景用于编辑
  const selectedLocation =
    story?.locations.find((l) => l.id === selectedLocationId) || null;

  // 打开创建场景对话框
  const handleOpenCreateDialog = () => {
    setIsEditMode(false);
    setFormData({
      name: "",
      description: "",
      background: "",
      scenes: [],
    });
    setIsDialogOpen(true);
  };

  // 打开编辑场景对话框
  const handleOpenEditDialog = (location: Location) => {
    setIsEditMode(true);
    setSelectedLocationId(location.id);
    setFormData({
      name: location.name,
      description: location.description,
      background: location.background || "",
      scenes: location.scenes,
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

  // 处理场景创建或更新
  const handleSaveLocation = () => {
    if (!story || !setStory) return;

    if (isEditMode && selectedLocationId) {
      // 更新现有场景
      const updatedLocations = story.locations.map((location) => {
        if (location.id === selectedLocationId) {
          return {
            ...location,
            name: formData.name || location.name,
            description: formData.description || location.description,
            background: formData.background || location.background,
          };
        }
        return location;
      });

      setStory({
        ...story,
        locations: updatedLocations,
      });
    } else {
      // 创建新场景
      const newLocation: Location = {
        id: generateId("location"),
        name: formData.name || "新场景",
        description: formData.description || "",
        background: formData.background || undefined,
        scenes: [],
      };

      setStory({
        ...story,
        locations: [...story.locations, newLocation],
      });
    }

    setIsDialogOpen(false);
  };

  // 处理场景删除
  const handleDeleteLocation = (locationId: string) => {
    if (!story || !setStory) return;

    // 检查场景是否在任何分支中使用
    const isUsed = story.scenes.some(
      (scene) => scene.locationId === locationId
    );

    if (isUsed) {
      // 显示警告
      alert(
        "无法删除此场景，因为它在一个或多个分支中被使用。请先更新这些分支。"
      );
      return;
    }

    setStory({
      ...story,
      locations: story.locations.filter(
        (location) => location.id !== locationId
      ),
    });
  };

  // 计算使用此场景的分支数量
  const getSceneCount = (locationId: string) => {
    if (!story) return 0;
    return story.scenes.filter((scene) => scene.locationId === locationId)
      .length;
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    isEditMode,
    formData,
    selectedLocation,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleInputChange,
    handleSaveLocation,
    handleDeleteLocation,
    getSceneCount
  };
};
