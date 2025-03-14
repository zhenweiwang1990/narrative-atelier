
import React from 'react';
import { useStory } from '@/components/Layout';
import FlowEditor from '@/components/FlowEditor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useSceneManagementHook } from '@/hooks/useSceneManagementHook';
import EditorPanel from '@/components/flow/EditorPanel';
import PreviewPanel from '@/components/flow/PreviewPanel';

const Flow = () => {
  const { story, setStory } = useStory();
  
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
    updateNextScene
  } = useSceneManagementHook(story, setStory);

  if (!story) return null;
  
  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Scene Flow</h1>
          <p className="text-sm text-muted-foreground">
            Visualize and manage the flow of scenes in your interactive story.
          </p>
        </div>
        
        <Button size="sm" onClick={handleAddScene}>
          Add Scene
        </Button>
      </div>
      
      {story.scenes.length === 0 ? (
        <Alert variant="default" className="bg-amber-50 text-amber-600 border-amber-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You don't have any scenes yet. Add a scene to get started.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-[calc(100vh-11rem)]">
          <div className="md:col-span-2 border rounded-md overflow-hidden h-full">
            <FlowEditor onSceneSelect={handleSceneSelect} />
          </div>
          
          <div className="h-full grid grid-rows-2 gap-3">
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
            />
            
            <PreviewPanel 
              selectedSceneId={selectedSceneId}
              setSelectedSceneId={setSelectedSceneId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Flow;
