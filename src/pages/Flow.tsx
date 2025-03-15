
import React, { useState } from 'react';
import { useStory } from '@/components/Layout';
import FlowEditor from '@/components/flow/FlowEditor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useSceneManagementHook } from '@/hooks/useSceneManagementHook';
import EditorPanel from '@/components/flow/EditorPanel';
import FloatingMobilePreview from '@/components/flow/FloatingMobilePreview';
import { SceneType } from '@/utils/types';

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

  // 将默认标签设置为"properties"而不是"flow"
  React.useEffect(() => {
    if (activeTab === 'flow') {
      setActiveTab('properties');
    }
  }, [activeTab, setActiveTab]);

  // Ensure we update the element selection when scene changes
  React.useEffect(() => {
    // Reset element selection when changing scenes
    setSelectedElementId('');
  }, [selectedSceneId]);

  // Handle scene addition with type
  const handleAddSceneWithType = (type?: SceneType) => {
    handleAddScene(type || 'normal');
  };

  // Create adapter functions to match the expected signatures
  const handleUpdateSceneTitle = (newTitle: string) => {
    if (selectedSceneId) {
      updateSceneTitle(selectedSceneId, newTitle);
    }
  };

  const handleUpdateSceneType = (newType: SceneType) => {
    if (selectedSceneId) {
      updateSceneType(selectedSceneId, newType);
    }
  };

  const handleUpdateSceneLocation = (locationId: string) => {
    if (selectedSceneId) {
      updateSceneLocation(selectedSceneId, locationId);
    }
  };

  const handleUpdateNextScene = (nextSceneId: string) => {
    if (selectedSceneId) {
      updateNextScene(selectedSceneId, nextSceneId);
    }
  };

  const handleUpdateRevivalPoint = (revivalPointId: string) => {
    if (selectedSceneId) {
      updateRevivalPoint(selectedSceneId, revivalPointId);
    }
  };

  // New handlers for the added scene properties
  const handleUpdateSceneEntrance = (effect: string) => {
    if (!selectedSceneId || !story || !setStory) return;
    
    const updatedScenes = story.scenes.map(scene => 
      scene.id === selectedSceneId 
        ? { ...scene, entranceEffect: effect } 
        : scene
    );
    
    setStory({ ...story, scenes: updatedScenes });
  };

  const handleUpdateSceneEnvironment = (effect: string) => {
    if (!selectedSceneId || !story || !setStory) return;
    
    const updatedScenes = story.scenes.map(scene => 
      scene.id === selectedSceneId 
        ? { ...scene, environmentEffect: effect } 
        : scene
    );
    
    setStory({ ...story, scenes: updatedScenes });
  };

  const handleUpdateEndingName = (name: string) => {
    if (!selectedSceneId || !story || !setStory) return;
    
    const updatedScenes = story.scenes.map(scene => 
      scene.id === selectedSceneId 
        ? { ...scene, endingName: name } 
        : scene
    );
    
    setStory({ ...story, scenes: updatedScenes });
  };

  if (!story) return null;
  
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col space-y-3">
      {story.scenes.length === 0 ? (
        <Alert variant="default" className="bg-amber-50 text-amber-600 border-amber-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            您还没有任何分支。添加一个分支开始。
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
          <div className="md:col-span-2 border rounded-md overflow-hidden h-full">
            <FlowEditor 
              onSceneSelect={handleSceneSelect} 
              onPreviewToggle={() => setIsPreviewOpen(!isPreviewOpen)}
              onAddSceneWithType={handleAddSceneWithType}
            />
          </div>
          
          <div className="h-full">
            <EditorPanel 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selectedSceneId={selectedSceneId}
              selectedScene={selectedScene}
              story={story}
              updateSceneTitle={handleUpdateSceneTitle}
              updateSceneType={handleUpdateSceneType}
              updateSceneLocation={handleUpdateSceneLocation}
              updateNextScene={handleUpdateNextScene}
              updateRevivalPoint={handleUpdateRevivalPoint}
              selectedElementId={selectedElementId}
              setSelectedElementId={setSelectedElementId}
              updateSceneEntrance={handleUpdateSceneEntrance}
              updateSceneEnvironment={handleUpdateSceneEnvironment}
              updateEndingName={handleUpdateEndingName}
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
