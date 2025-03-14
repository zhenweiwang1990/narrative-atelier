
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ElementEditor from '@/components/ElementEditor';
import { Scene } from '@/utils/types';
import ScenePropertiesPanel from './ScenePropertiesPanel';
import { Story } from '@/utils/types';

interface FlowTabContentProps {
  activeTab: string;
  selectedSceneId: string | null;
  selectedScene: Scene | undefined;
  story: Story;
  updateSceneTitle: (newTitle: string) => void;
  updateSceneType: (newType: any) => void;
  updateSceneLocation: (locationId: string) => void;
  updateNextScene: (nextSceneId: string) => void;
}

const FlowTabContent = ({
  activeTab,
  selectedSceneId,
  selectedScene,
  story,
  updateSceneTitle,
  updateSceneType,
  updateSceneLocation,
  updateNextScene
}: FlowTabContentProps) => {
  return (
    <>
      <TabsContent value="flow" className="flex-1 data-[state=active]:flex flex-col">
        <div className="text-center flex-1 flex items-center justify-center p-3 bg-muted/30 rounded-md mx-2 mb-2">
          <p className="text-sm text-muted-foreground">Select a scene from the flow diagram to edit its properties.</p>
        </div>
      </TabsContent>
      
      <TabsContent value="properties" className="data-[state=active]:flex flex-col h-full overflow-hidden">
        {selectedScene ? (
          <ScenePropertiesPanel 
            selectedScene={selectedScene}
            story={story}
            updateSceneTitle={updateSceneTitle}
            updateSceneType={updateSceneType}
            updateSceneLocation={updateSceneLocation}
            updateNextScene={updateNextScene}
            selectedSceneId={selectedSceneId || ''}
          />
        ) : (
          <div className="text-center flex-1 flex items-center justify-center p-3 bg-muted/30 rounded-md mx-2 mb-2">
            <p className="text-sm text-muted-foreground">Select a scene to edit its properties.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="elements" className="data-[state=active]:flex flex-col h-full overflow-hidden">
        {selectedSceneId ? (
          <div className="p-3 h-full overflow-y-auto">
            <ElementEditor sceneId={selectedSceneId} />
          </div>
        ) : (
          <div className="text-center flex-1 flex items-center justify-center p-3 bg-muted/30 rounded-md mx-2 mb-2">
            <p className="text-sm text-muted-foreground">Select a scene to edit its elements.</p>
          </div>
        )}
      </TabsContent>
    </>
  );
};

export default FlowTabContent;
