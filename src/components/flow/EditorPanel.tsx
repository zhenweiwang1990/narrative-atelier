
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FlowTabContent from './FlowTabContent';
import { Scene, Story } from '@/utils/types';

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
  updateNextScene
}: EditorPanelProps) => {
  return (
    <Card className="overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <div className="px-2 pt-2">
          <TabsList className="grid grid-cols-3 mb-2 h-8">
            <TabsTrigger value="flow" className="text-xs">Flow</TabsTrigger>
            <TabsTrigger value="properties" disabled={!selectedSceneId} className="text-xs">Properties</TabsTrigger>
            <TabsTrigger value="elements" disabled={!selectedSceneId} className="text-xs">Elements</TabsTrigger>
          </TabsList>
        </div>
        
        <FlowTabContent 
          activeTab={activeTab}
          selectedSceneId={selectedSceneId}
          selectedScene={selectedScene}
          story={story}
          updateSceneTitle={updateSceneTitle}
          updateSceneType={updateSceneType}
          updateSceneLocation={updateSceneLocation}
          updateNextScene={updateNextScene}
        />
      </Tabs>
    </Card>
  );
};

export default EditorPanel;
