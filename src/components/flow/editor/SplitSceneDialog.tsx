
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SceneElement, Scene } from "@/utils/types";
import { useStory } from "@/components/Layout";
import { generateId } from "@/utils/storage";
import { toast } from "sonner";

interface SplitSceneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sceneId: string;
  elements: SceneElement[];
}

export const SplitSceneDialog: React.FC<SplitSceneDialogProps> = ({
  open,
  onOpenChange,
  sceneId,
  elements
}) => {
  const { story, setStory } = useStory();
  const [splitElementIndex, setSplitElementIndex] = useState<number | null>(null);
  
  // Function to handle the scene split
  const handleSplitScene = () => {
    if (splitElementIndex === null || !story || !setStory) {
      return;
    }

    // Get the current scene
    const currentScene = story.scenes.find(scene => scene.id === sceneId);
    if (!currentScene) {
      toast.error("无法找到当前场景");
      return;
    }

    // Create a new scene ID
    const newSceneId = generateId("scene");
    
    // Create elements for the original and new scenes
    const originalSceneElements = elements.slice(0, splitElementIndex);
    const newSceneElements = elements.slice(splitElementIndex);
    
    // Store the next scene of the original scene
    const originalNextSceneId = currentScene.nextSceneId;
    
    // Create a default position if one doesn't exist
    const defaultPosition = { x: 0, y: 0 };
    const currentPosition = currentScene.position || defaultPosition;
    
    // Create the new scene with a position offset from the current scene
    const newScene: Scene = {
      id: newSceneId,
      title: `${currentScene.title} (拆分)`,
      type: currentScene.type,
      locationId: currentScene.locationId,
      elements: newSceneElements,
      position: {
        x: currentPosition.x + 250,
        y: currentPosition.y
      },
      nextSceneId: originalNextSceneId,
      entranceEffect: currentScene.entranceEffect,
      environmentEffect: currentScene.environmentEffect
    };
    
    // Update the original scene
    const updatedOriginalScene = {
      ...currentScene,
      elements: originalSceneElements,
      nextSceneId: newSceneId  // Point to the new scene
    };
    
    // Update the scenes in the story
    const updatedScenes = story.scenes.map(scene => 
      scene.id === sceneId ? updatedOriginalScene : scene
    );
    
    // Add the new scene to the story
    updatedScenes.push(newScene);
    
    // Update the story
    setStory({
      ...story,
      scenes: updatedScenes
    });
    
    // Close the dialog and notify the user
    onOpenChange(false);
    toast.success("场景拆分成功");
  };
  
  // Calculate display information for each element
  const getElementPreview = (element: SceneElement, index: number) => {
    let preview = "";
    
    switch (element.type) {
      case "narration":
        preview = `旁白: ${element.text?.substring(0, 20)}${element.text?.length > 20 ? '...' : ''}`;
        break;
      case "dialogue":
        const character = story?.characters.find(c => c.id === element.characterId);
        preview = `${character?.name || '未知角色'}: ${element.text?.substring(0, 20)}${element.text?.length > 20 ? '...' : ''}`;
        break;
      case "thought":
        const thinkingChar = story?.characters.find(c => c.id === element.characterId);
        preview = `思考 (${thinkingChar?.name || '未知角色'}): ${element.text?.substring(0, 20)}${element.text?.length > 20 ? '...' : ''}`;
        break;
      case "choice":
        preview = `选择: ${element.text?.substring(0, 20)}${element.text?.length > 20 ? '...' : ''}`;
        break;
      case "qte":
        preview = `快速反应: ${element.description?.substring(0, 20)}${element.description?.length > 20 ? '...' : ''}`;
        break;
      case "dialogueTask":
        preview = `对话任务: ${element.goal?.substring(0, 20)}${element.goal?.length > 20 ? '...' : ''}`;
        break;
      default:
        preview = `元素 ${index + 1}`;
    }
    
    return preview;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">拆分场景</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            选择一个元素作为新场景的开始点。拆分后，选中的元素及其后续元素将被移动到新场景中。
          </p>
          
          {elements.length === 0 ? (
            <div className="text-center p-4 bg-muted/50 rounded-md">
              <p className="text-muted-foreground">当前场景没有元素可拆分</p>
            </div>
          ) : (
            <RadioGroup value={splitElementIndex?.toString() || ""} onValueChange={(value) => setSplitElementIndex(parseInt(value))}>
              <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
                {elements.map((element, index) => (
                  <div key={element.id} className="flex items-start space-x-2 p-2 border rounded-md">
                    <RadioGroupItem value={index.toString()} id={`element-${index}`} className="mt-0.5" />
                    <Label htmlFor={`element-${index}`} className="font-normal text-xs flex-1">
                      <div className="flex flex-col">
                        <span className="font-medium">{getElementPreview(element, index)}</span>
                        <span className="text-muted-foreground text-xs mt-1">
                          元素 {index + 1} / {elements.length}
                        </span>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>取消</Button>
          <Button 
            onClick={handleSplitScene} 
            disabled={splitElementIndex === null || elements.length === 0}
          >
            拆分场景
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
