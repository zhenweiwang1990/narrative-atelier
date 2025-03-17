
import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Story } from "@/utils/types";
import { useExplorationItems } from "@/hooks/useExplorationItems";
import ExplorationHeader from "./exploration/ExplorationHeader";
import ExplorationTabContent from "./exploration/ExplorationTabContent";

interface ExplorationPanelProps {
  sceneId: string;
  story: Story;
}

const ExplorationPanel: React.FC<ExplorationPanelProps> = ({ sceneId, story }) => {
  const [activeTab, setActiveTab] = useState<"item" | "knowledge">("item");
  
  const {
    items,
    isGenerating,
    editingItem,
    isEditing,
    editName,
    editDescription,
    editIsCollectible,
    editImage,
    isImageSelectorOpen,
    getItemsByType,
    initNewItem,
    initEditItem,
    cancelEdit,
    saveItem,
    deleteItem,
    generateWithAI,
    setEditName,
    setEditDescription,
    setEditIsCollectible,
    openImageSelector,
    closeImageSelector,
    handleImageSelected
  } = useExplorationItems(sceneId);

  // Filter items by active tab type
  const itemsOfType = getItemsByType(activeTab);

  return (
    <div className="space-y-4">
      <ExplorationHeader 
        isGenerating={isGenerating}
        onGenerate={generateWithAI}
      />

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "item" | "knowledge")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="item">物品</TabsTrigger>
          <TabsTrigger value="knowledge">知识</TabsTrigger>
        </TabsList>

        <TabsContent value="item">
          <ExplorationTabContent
            type="item"
            items={itemsOfType}
            isEditing={isEditing && activeTab === "item"}
            editingItem={editingItem}
            editName={editName}
            editDescription={editDescription}
            editIsCollectible={editIsCollectible}
            editImage={editImage}
            isImageSelectorOpen={isImageSelectorOpen}
            onAddNew={() => initNewItem("item")}
            onEditItem={initEditItem}
            onDeleteItem={deleteItem}
            onCancel={cancelEdit}
            onSave={() => saveItem(activeTab)}
            onNameChange={setEditName}
            onDescriptionChange={setEditDescription}
            onCollectibleChange={setEditIsCollectible}
            onOpenImageSelector={openImageSelector}
            onCloseImageSelector={closeImageSelector}
            onImageSelected={handleImageSelected}
          />
        </TabsContent>

        <TabsContent value="knowledge">
          <ExplorationTabContent
            type="knowledge"
            items={itemsOfType}
            isEditing={isEditing && activeTab === "knowledge"}
            editingItem={editingItem}
            editName={editName}
            editDescription={editDescription}
            editIsCollectible={editIsCollectible}
            isImageSelectorOpen={isImageSelectorOpen}
            onAddNew={() => initNewItem("knowledge")}
            onEditItem={initEditItem}
            onDeleteItem={deleteItem}
            onCancel={cancelEdit}
            onSave={() => saveItem(activeTab)}
            onNameChange={setEditName}
            onDescriptionChange={setEditDescription}
            onCollectibleChange={setEditIsCollectible}
            onOpenImageSelector={openImageSelector}
            onCloseImageSelector={closeImageSelector}
            onImageSelected={handleImageSelected}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplorationPanel;
