
import React, { useState } from 'react';
import { useStory } from '@/components/Layout';
import FlowEditor from '@/components/FlowEditor';
import ElementEditor from '@/components/ElementEditor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Plus, Edit, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { generateId } from '@/utils/storage';
import { Scene, SceneType } from '@/utils/types';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const Flow = () => {
  const { story, setStory } = useStory();
  const { toast } = useToast();
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("flow");
  
  const selectedScene = story?.scenes.find(scene => scene.id === selectedSceneId);

  const handleAddScene = () => {
    if (!story || !setStory) return;
    
    const newScene: Scene = {
      id: generateId('scene'),
      title: `New Scene ${story.scenes.length + 1}`,
      type: 'normal',
      locationId: story.locations[0]?.id || '',
      elements: []
    };
    
    setStory({
      ...story,
      scenes: [...story.scenes, newScene]
    });
    
    toast({
      title: "Scene added",
      description: `${newScene.title} has been added to your story.`
    });
    
    setSelectedSceneId(newScene.id);
    setActiveTab("properties");
  };

  const handleSceneSelect = (sceneId: string) => {
    setSelectedSceneId(sceneId);
    setActiveTab("properties");
  };

  const updateSceneTitle = (newTitle: string) => {
    if (!story || !setStory || !selectedSceneId) return;
    
    const updatedScenes = story.scenes.map(scene => {
      if (scene.id === selectedSceneId) {
        return {
          ...scene,
          title: newTitle
        };
      }
      return scene;
    });
    
    setStory({
      ...story,
      scenes: updatedScenes
    });
  };

  const updateSceneType = (newType: SceneType) => {
    if (!story || !setStory || !selectedSceneId) return;
    
    const updatedScenes = story.scenes.map(scene => {
      if (scene.id === selectedSceneId) {
        return {
          ...scene,
          type: newType
        };
      }
      return scene;
    });
    
    setStory({
      ...story,
      scenes: updatedScenes
    });
  };

  const updateSceneLocation = (locationId: string) => {
    if (!story || !setStory || !selectedSceneId) return;
    
    const updatedScenes = story.scenes.map(scene => {
      if (scene.id === selectedSceneId) {
        return {
          ...scene,
          locationId
        };
      }
      return scene;
    });
    
    setStory({
      ...story,
      scenes: updatedScenes
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 border rounded-md overflow-hidden">
            <div className="h-[70vh]">
              <FlowEditor onSceneSelect={handleSceneSelect} />
            </div>
          </div>
          
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="flow">Flow</TabsTrigger>
                <TabsTrigger value="properties" disabled={!selectedSceneId}>Properties</TabsTrigger>
              </TabsList>
              
              <TabsContent value="flow">
                <div className="text-center p-6 bg-muted/30 rounded-lg border border-dashed h-[calc(70vh-2rem)]">
                  <p className="text-muted-foreground">Select a scene from the flow diagram to edit its properties.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="properties">
                {selectedScene ? (
                  <div className="space-y-6 h-[calc(70vh-2rem)] overflow-y-auto">
                    <Card className="p-4">
                      <h3 className="text-lg font-medium flex items-center mb-4">
                        <Edit className="mr-2 h-4 w-4" /> Scene Properties
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={selectedScene.title}
                            onChange={(e) => updateSceneTitle(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="type">Scene Type</Label>
                          <Select 
                            value={selectedScene.type} 
                            onValueChange={(value: SceneType) => updateSceneType(value)}
                          >
                            <SelectTrigger id="type" className="mt-1">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="start">Start</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="ending">Good Ending</SelectItem>
                              <SelectItem value="bad-ending">Bad Ending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Select 
                            value={selectedScene.locationId} 
                            onValueChange={updateSceneLocation}
                          >
                            <SelectTrigger id="location" className="mt-1">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              {story.locations.map(location => (
                                <SelectItem key={location.id} value={location.id}>
                                  {location.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <h3 className="text-lg font-medium mb-4">Scene Elements</h3>
                      <ElementEditor sceneId={selectedScene.id} />
                    </Card>
                  </div>
                ) : (
                  <div className="text-center p-6 bg-muted/30 rounded-lg border border-dashed h-[calc(70vh-2rem)]">
                    <p className="text-muted-foreground">No scene selected. Click on a scene in the flow diagram to edit it.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flow;
