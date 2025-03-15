
import React, { useState } from "react";
import { useStory } from "@/components/Layout";
import { useLocationForm } from "@/hooks/location/useLocationForm";
import LocationHeader from "@/components/location/LocationHeader";
import LocationSearchBar from "@/components/location/LocationSearchBar";
import LocationList from "@/components/location/LocationList";
import LocationDialog from "@/components/location/LocationDialog";
import ImageSelectorDialog from "@/components/ai-story/ImageSelectorDialog";

const Locations = () => {
  const { story } = useStory();
  const [searchQuery, setSearchQuery] = useState("");
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  const [imageLocationId, setImageLocationId] = useState<string | null>(null);
  
  const {
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
  } = useLocationForm();

  // 根据搜索查询过滤场景
  const filteredLocations =
    story?.locations.filter(
      (location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // 打开图片选择器
  const handleOpenImageSelector = (locationId: string) => {
    setImageLocationId(locationId);
    setIsImageSelectorOpen(true);
  };

  // 处理图片选择
  const handleImageSelected = (imageUrl: string) => {
    if (imageLocationId && story) {
      const updatedLocations = story.locations.map((location) => {
        if (location.id === imageLocationId) {
          return {
            ...location,
            background: imageUrl
          };
        }
        return location;
      });

      if (story) {
        story.locations = updatedLocations;
      }
    }
    setIsImageSelectorOpen(false);
  };

  if (!story) return null;

  return (
    <div className="space-y-4">
      <LocationHeader onAddLocation={handleOpenCreateDialog} />

      <div className="flex items-center mb-4">
        <LocationSearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <LocationList 
        locations={filteredLocations}
        getSceneCount={getSceneCount}
        onEdit={handleOpenEditDialog}
        onDelete={handleDeleteLocation}
        onOpenImageSelector={handleOpenImageSelector}
      />

      <LocationDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        isEditMode={isEditMode}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={handleSaveLocation}
      />

      {/* 图片选择器弹窗 */}
      <ImageSelectorDialog
        open={isImageSelectorOpen}
        onOpenChange={setIsImageSelectorOpen}
        onImageSelected={handleImageSelected}
        aspectRatio={16/9}
        title="选择地点背景图片"
      />
    </div>
  );
};

export default Locations;
