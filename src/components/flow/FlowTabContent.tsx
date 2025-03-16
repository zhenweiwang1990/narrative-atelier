
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ElementEditor from '@/components/ElementEditor';
import { Scene } from '@/utils/types';
import ScenePropertiesPanel from './ScenePropertiesPanel';
import ExplorationPanel from './ExplorationPanel';
import { Story } from '@/utils/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FlowTabContentProps {
  activeTab: string;
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
  updateBackgroundMusic?: (music: { id: string; name: string; url: string }) => void;
  updateSceneUnlockPrice?: (price: number | undefined) => void;
}

const FlowTabContent = ({
  activeTab,
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
  updateSceneUnlockPrice
}: FlowTabContentProps) => {
  return (
    <>
      <TabsContent value="properties" className="data-[state=active]:flex flex-col h-full m-0 overflow-hidden">
        {selectedScene ? (
          <ScrollArea className="h-full">
            <div className="p-3">
              <ScenePropertiesPanel 
                selectedScene={selectedScene}
                story={story}
                updateSceneTitle={updateSceneTitle}
                updateSceneType={updateSceneType}
                updateSceneLocation={updateSceneLocation}
                updateNextScene={updateNextScene}
                updateRevivalPoint={updateRevivalPoint}
                selectedSceneId={selectedSceneId || ''}
                updateSceneEntrance={updateSceneEntrance}
                updateSceneEnvironment={updateSceneEnvironment}
                updateEndingName={updateEndingName}
                updateEndingPoster={updateEndingPoster}
                updateBackgroundMusic={updateBackgroundMusic}
                updateSceneUnlockPrice={updateSceneUnlockPrice}
              />
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center flex-1 flex items-center justify-center p-3 bg-muted/30 rounded-md mx-2 mb-2">
            <p className="text-sm text-muted-foreground">Select a scene to edit its properties.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="elements" className="data-[state=active]:flex flex-col h-full m-0 overflow-hidden">
        {selectedSceneId ? (
          <ScrollArea className="h-full">
            <div className="p-3">
              <ElementEditor 
                sceneId={selectedSceneId} 
                selectedElementId={selectedElementId}
                onSelectElement={setSelectedElementId ? setSelectedElementId : () => {}}
              />
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center flex-1 flex items-center justify-center p-3 bg-muted/30 rounded-md mx-2 mb-2">
            <p className="text-sm text-muted-foreground">Select a scene to edit its elements.</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="exploration" className="data-[state=active]:flex flex-col h-full m-0 overflow-hidden">
        {selectedSceneId ? (
          <ScrollArea className="h-full">
            <div className="p-3">
              <ExplorationPanel 
                sceneId={selectedSceneId}
                story={story}
              />
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center flex-1 flex items-center justify-center p-3 bg-muted/30 rounded-md mx-2 mb-2">
            <p className="text-sm text-muted-foreground">Select a scene to edit its exploration items.</p>
          </div>
        )}
      </TabsContent>
    </>
  );
};

export default FlowTabContent;
