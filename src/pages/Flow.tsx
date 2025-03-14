
import React, { useState } from 'react';
import { useStory } from '@/components/Layout';
import FlowEditor from '@/components/FlowEditor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useSceneManagementHook } from '@/hooks/useSceneManagementHook';
import EditorPanel from '@/components/flow/EditorPanel';
import FloatingMobilePreview from '@/components/flow/FloatingMobilePreview';

const Flow = () => {
  const { story, setStory } = useStory();
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const [selectedElementId, setSelectedElementId] = useState<string>('');
  
  const {
    selectedSceneId,
    setSelectedSceneId,
    activeTab,
    setActiveTab,
    selectedScene,
    handleAddScene,
    handleSceneSelect,
    updateSceneTitle,
    updateSceneType,
    updateSceneLocation,
    updateNextScene,
    updateRevivalPoint
  } = useSceneManagementHook(story, setStory);

  if (!story) return null;
  
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {story.scenes.length === 0 ? (
        <Alert variant="default" className="bg-amber-50 text-amber-600 border-amber-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You don't have any scenes yet. Add a scene to get started.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
          <div className="md:col-span-2 border rounded-md overflow-hidden h-full">
            <FlowEditor 
              onSceneSelect={handleSceneSelect} 
              onPreviewToggle={() => setIsPreviewOpen(!isPreviewOpen)}
            />
          </div>
          
          <div className="h-full">
            <EditorPanel 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
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
            />
          </div>
        </div>
      )}
      
      <FloatingMobilePreview 
        selectedSceneId={selectedSceneId} 
        setSelectedSceneId={setSelectedSceneId} 
        isOpen={isPreviewOpen}
        onToggle={() => setIsPreviewOpen(!isPreviewOpen)}
      />
    </div>
  );
};

export default Flow;
