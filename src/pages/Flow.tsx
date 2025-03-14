
import React from 'react';
import { useStory } from '@/components/Layout';
import { FlowEditor } from '@/components/FlowEditor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { generateId } from '@/utils/storage';
import { Scene } from '@/utils/types';

const Flow = () => {
  const { story, setStory } = useStory();
  const { toast } = useToast();

  const handleAddScene = () => {
    if (!story || !setStory) return;
    
    const newScene: Scene = {
      id: generateId('scene'),
      title: `New Scene ${story.scenes.length + 1}`,
      elements: [],
      position: { x: 250, y: 250 },
      connections: []
    };
    
    setStory({
      ...story,
      scenes: [...story.scenes, newScene]
    });
    
    toast({
      title: "Scene added",
      description: `${newScene.title} has been added to your story.`
    });
  };

  if (!story) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scene Flow</h1>
          <p className="text-muted-foreground">
            Visualize and manage the flow of scenes in your interactive story.
          </p>
        </div>
        
        <Button onClick={handleAddScene}>
          <Plus className="h-4 w-4 mr-2" /> Add Scene
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
        <div className="h-[70vh] border rounded-md overflow-hidden">
          <FlowEditor />
        </div>
      )}
    </div>
  );
};

export default Flow;
