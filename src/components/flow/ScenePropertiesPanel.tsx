
import React from "react";
import { ScenePropertiesPanelProps } from "./types/panelTypes";
import { checkSceneCompletion } from "./utils/sceneUtils";
import IncompleteSceneAlert from "./panel/IncompleteSceneAlert";
import SceneMetadataSection from "./panel/SceneMetadataSection";
import SceneFlowSection from "./panel/SceneFlowSection";
import SceneEditHint from "./panel/SceneEditHint";
import SceneVisualEffectsSection from "./panel/SceneVisualEffectsSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ScenePropertiesPanel = ({
  selectedScene,
  story,
  updateSceneTitle,
  updateSceneType,
  updateSceneLocation,
  updateNextScene,
  updateRevivalPoint,
  selectedSceneId,
  updateSceneEntrance,
  updateSceneEnvironment,
  updateEndingName,
  updateEndingPoster,
  updateBackgroundMusic,
  updateSceneUnlockPrice,
}: ScenePropertiesPanelProps) => {
  const sceneIsIncomplete = checkSceneCompletion(selectedScene);
  
  return (
    <div className="space-y-3">
      <IncompleteSceneAlert isIncomplete={sceneIsIncomplete} />
      
      <Accordion type="multiple" defaultValue={["metadata", "visual", "flow", "help"]} className="space-y-3">
        <AccordionItem value="metadata" className="border rounded-md overflow-hidden">
          <AccordionTrigger className="px-3 py-2 hover:no-underline">
            <span className="text-sm font-medium">基本信息</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-3 pb-3">
              <SceneMetadataSection
                selectedScene={selectedScene}
                story={story}
                updateSceneTitle={updateSceneTitle}
                updateSceneType={updateSceneType}
                updateSceneLocation={updateSceneLocation}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="visual" className="border rounded-md overflow-hidden">
          <AccordionTrigger className="px-3 py-2 hover:no-underline">
            <span className="text-sm font-medium">视觉和音效</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-3 pb-3">
              <SceneVisualEffectsSection
                selectedScene={selectedScene}
                updateSceneEntrance={updateSceneEntrance}
                updateSceneEnvironment={updateSceneEnvironment}
                updateBackgroundMusic={updateBackgroundMusic}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="flow" className="border rounded-md overflow-hidden">
          <AccordionTrigger className="px-3 py-2 hover:no-underline">
            <span className="text-sm font-medium">流程控制</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-3 pb-3">
              <SceneFlowSection
                selectedScene={selectedScene}
                story={story}
                selectedSceneId={selectedSceneId}
                updateNextScene={updateNextScene}
                updateRevivalPoint={updateRevivalPoint}
                updateEndingName={updateEndingName}
                updateEndingPoster={updateEndingPoster}
                updateSceneUnlockPrice={updateSceneUnlockPrice}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="help" className="border rounded-md overflow-hidden">
          <AccordionTrigger className="px-3 py-2 hover:no-underline">
            <span className="text-sm font-medium">编辑帮助</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-3 pb-3">
              <SceneEditHint />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ScenePropertiesPanel;
