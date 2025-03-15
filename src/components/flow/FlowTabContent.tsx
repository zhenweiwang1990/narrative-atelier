
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ElementEditor from '@/components/ElementEditor';
import { Scene } from '@/utils/types';
import ScenePropertiesPanel from './ScenePropertiesPanel';
import ExplorationPanel from './ExplorationPanel';
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
  updateRevivalPoint?: (sceneId: string) => void;
  selectedElementId?: string;
  setSelectedElementId?: (id: string) => void;
  // New props for scene effects and ending name
  updateSceneEntrance?: (effect: string) => void;
  updateSceneEnvironment?: (effect: string) => void;
  updateEndingName?: (name: string) => void;
  updateBackgroundMusic?: (music: { url: string; name: string; isUploaded: boolean }) => void;
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
  updateBackgroundMusic
}: FlowTabContentProps) => {
  return (
    <>
      <TabsContent value="properties" className="data-[state=active]:flex flex-col h-full overflow-hidden">
        {selectedScene ? (
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
            updateBackgroundMusic={updateBackgroundMusic}
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
            <ElementEditor 
              sceneId={selectedSceneId} 
              selectedElementId={selectedElementId}
              onSelectElement={setSelectedElementId ? setSelectedElementId : () => {}}
            />
          </div>
        ) : (
          <div className="text-center flex-1 flex items-center justify-center p-3 bg-muted/30 rounded-md mx-2 mb-2">
            <p className="text-sm text-muted-foreground">Select a scene to edit its elements.</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="exploration" className="data-[state=active]:flex flex-col h-full overflow-hidden">
        {selectedSceneId ? (
          <div className="p-3 h-full overflow-y-auto">
            <ExplorationPanel 
              sceneId={selectedSceneId}
              story={story}
            />
          </div>
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
