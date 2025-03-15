
import React, { useState, useEffect } from 'react';
import { useStory } from '@/context/StoryContext';
import { StoryWrapper } from '@/components/layout/StoryWrapper';
import FlowEditor from '@/components/flow/FlowEditor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useSceneManagementHook } from '@/hooks/useSceneManagementHook';
import EditorPanel from '@/components/flow/EditorPanel';
import FloatingMobilePreview from '@/components/flow/FloatingMobilePreview';

const Flow = () => {
  const { story, setStory } = useStory();
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const [selectedElementId, setSelectedElementId] = useState<string>('');
  const [isReady, setIsReady] = useState(false);
  
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
  useEffect(() => {
    if (activeTab === 'flow') {
      setActiveTab('properties');
    }
  }, [activeTab, setActiveTab]);
  
  // Ensure UI stability after story is loaded
  useEffect(() => {
    if (story && !isReady) {
      // Small delay to ensure components have time to process story data
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [story, isReady]);
  
  if (!story) {
    return (
      <StoryWrapper>
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
          <p className="text-muted-foreground">正在加载剧情数据...</p>
        </div>
      </StoryWrapper>
    );
  }
  
  return (
    <StoryWrapper>
      <div className="h-[calc(100vh-4rem)] flex flex-col space-y-3">
        {story && story.scenes.length === 0 ? (
          <Alert variant="default" className="bg-amber-50 text-amber-600 border-amber-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              您还没有任何分支。添加一个分支开始。
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
            <div className="md:col-span-2 border rounded-md overflow-hidden h-full">
              {isReady && (
                <FlowEditor 
                  onSceneSelect={handleSceneSelect} 
                  onPreviewToggle={() => setIsPreviewOpen(!isPreviewOpen)}
                />
              )}
            </div>
            
            <div className="h-full">
              {isReady && (
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
              )}
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
    </StoryWrapper>
  );
};

export default Flow;
