import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FlowTabContent from "./FlowTabContent";
import { Scene, Story } from "@/utils/types";

interface EditorPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSceneId: string | null;
  selectedScene: Scene | undefined;
  story: Story;
  updateSceneTitle: (newTitle: string) => void;
  updateSceneType: (newType: any) => void;
  updateSceneLocation: (locationId: string) => void;
  updateNextScene: (nextSceneId: string) => void;
  updateRevivalPoint?: (sceneId: string) => void;
  selectedElementId?: string;
  setSelectedElementId?: (id: string) => void;
  // New props for scene effects and ending name
  updateSceneEntrance?: (effect: string) => void;
  updateSceneEnvironment?: (effect: string) => void;
  updateEndingName?: (name: string) => void;
  updateEndingPoster?: (url: string) => void;
  updateBackgroundMusic?: (music: {
    id: string;
    name: string;
    url: string;
  }) => void;
  updateSceneUnlockPrice?: (price: number | undefined) => void;
}

const EditorPanel = ({
  activeTab,
  setActiveTab,
  selectedSceneId,
  selectedScene,
  story,
  updateSceneTitle,
  updateSceneType,
  updateSceneLocation,
  updateNextScene,
  updateRevivalPoint,
  selectedElementId,
  setSelectedElementId,
  updateSceneEntrance,
  updateSceneEnvironment,
  updateEndingName,
  updateEndingPoster,
  updateBackgroundMusic,
  updateSceneUnlockPrice,
}: EditorPanelProps) => {
  return (
    <Card className="overflow-hidden h-full max-w-[520px] flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="h-full flex flex-col"
      >
        <div className="px-2 pt-2 flex-shrink-0">
          <TabsList className="grid grid-cols-3 mb-2 h-9">
            <TabsTrigger
              value="properties"
              disabled={!selectedSceneId}
              className="text-xs"
            >
              属性
            </TabsTrigger>
            <TabsTrigger
              value="elements"
              disabled={!selectedSceneId}
              className="text-xs"
            >
              内容
            </TabsTrigger>
            <TabsTrigger
              value="exploration"
              disabled={!selectedSceneId}
              className="text-xs"
            >
              探索项
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <FlowTabContent
            activeTab={activeTab}
            selectedSceneId={selectedSceneId}
            selectedScene={selectedScene}
            story={story}
            updateSceneTitle={updateSceneTitle}
            updateSceneType={updateSceneType}
            updateSceneLocation={updateSceneLocation}
            updateNextScene={updateNextScene}
            updateRevivalPoint={updateRevivalPoint}
            selectedElementId={selectedElementId}
            setSelectedElementId={setSelectedElementId}
            updateSceneEntrance={updateSceneEntrance}
            updateSceneEnvironment={updateSceneEnvironment}
            updateEndingName={updateEndingName}
            updateEndingPoster={updateEndingPoster}
            updateBackgroundMusic={updateBackgroundMusic}
            updateSceneUnlockPrice={updateSceneUnlockPrice}
          />
        </div>
      </Tabs>
    </Card>
  );
};

export default EditorPanel;
