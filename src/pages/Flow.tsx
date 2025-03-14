
import React, { useState } from 'react';
import { useStory } from '@/components/Layout';
import FlowEditor from '@/components/FlowEditor';
import ElementEditor from '@/components/ElementEditor';
import MobilePreview from '@/components/MobilePreview';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Edit, MapPin } from 'lucide-react';
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

  const updateNextScene = (nextSceneId: string) => {
    if (!story || !setStory || !selectedSceneId) return;
    
    const updatedScenes = story.scenes.map(scene => {
      if (scene.id === selectedSceneId) {
        return {
          ...scene,
          nextSceneId: nextSceneId || undefined
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
            <Card className="overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <div className="px-2 pt-2">
                  <TabsList className="grid grid-cols-3 mb-2 h-8">
                    <TabsTrigger value="flow" className="text-xs">Flow</TabsTrigger>
                    <TabsTrigger value="properties" disabled={!selectedSceneId} className="text-xs">Properties</TabsTrigger>
                    <TabsTrigger value="elements" disabled={!selectedSceneId} className="text-xs">Elements</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="flow" className="flex-1 data-[state=active]:flex flex-col">
                  <div className="text-center flex-1 flex items-center justify-center p-3 bg-muted/30 rounded-md mx-2 mb-2">
                    <p className="text-sm text-muted-foreground">Select a scene from the flow diagram to edit its properties.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="properties" className="data-[state=active]:flex flex-col h-full overflow-hidden">
                  {selectedScene ? (
                    <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                      <div>
                        <Label htmlFor="title" className="text-xs">Title</Label>
                        <Input
                          id="title"
                          value={selectedScene.title}
                          onChange={(e) => updateSceneTitle(e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="type" className="text-xs">Scene Type</Label>
                        <Select 
                          value={selectedScene.type} 
                          onValueChange={(value: SceneType) => updateSceneType(value)}
                        >
                          <SelectTrigger id="type" className="h-8 text-sm">
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
                        <Label htmlFor="location" className="text-xs">Location</Label>
                        <Select 
                          value={selectedScene.locationId} 
                          onValueChange={updateSceneLocation}
                        >
                          <SelectTrigger id="location" className="h-8 text-sm">
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
                      
                      <div>
                        <Label htmlFor="nextScene" className="text-xs">Next Scene (Linear Flow)</Label>
                        <Select 
                          value={selectedScene.nextSceneId || ""} 
                          onValueChange={updateNextScene}
                        >
                          <SelectTrigger id="nextScene" className="h-8 text-sm">
                            <SelectValue placeholder="Select next scene" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">None (End or Choice-based)</SelectItem>
                            {story.scenes
                              .filter(scene => scene.id !== selectedSceneId)
                              .map(scene => (
                                <SelectItem key={scene.id} value={scene.id}>
                                  {scene.title} ({scene.type})
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                        <Edit className="h-3 w-3" /> 
                        <span>Set scene connections in the diagram, or switch to the Elements tab.</span>
                      </div>
                    </div>
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
              </Tabs>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="px-3 py-2 border-b bg-muted/20 flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <h3 className="text-sm font-medium">Mobile Preview</h3>
              </div>
              
              <div className="h-[calc(100%-35px)]">
                {selectedSceneId ? (
                  <MobilePreview 
                    sceneId={selectedSceneId} 
                    onSceneChange={setSelectedSceneId} 
                  />
                ) : (
                  <div className="h-full flex items-center justify-center p-4 text-center">
                    <p className="text-sm text-muted-foreground">Select a scene to preview.</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flow;
