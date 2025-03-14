
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, RotateCcw } from 'lucide-react';
import { Scene, SceneType, Story } from '@/utils/types';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface ScenePropertiesPanelProps {
  selectedScene: Scene;
  story: Story;
  updateSceneTitle: (newTitle: string) => void;
  updateSceneType: (newType: SceneType) => void;
  updateSceneLocation: (locationId: string) => void;
  updateNextScene: (nextSceneId: string) => void;
  updateRevivalPoint?: (sceneId: string) => void;
  selectedSceneId: string;
}

const ScenePropertiesPanel = ({
  selectedScene,
  story,
  updateSceneTitle,
  updateSceneType,
  updateSceneLocation,
  updateNextScene,
  updateRevivalPoint,
  selectedSceneId
}: ScenePropertiesPanelProps) => {
  const isEndingType = selectedScene.type === 'ending' || selectedScene.type === 'bad-ending';
  
  return (
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
      
      {!isEndingType && (
        <div>
          <Label htmlFor="nextScene" className="text-xs">Next Scene (Linear Flow)</Label>
          <Select 
            value={selectedScene.nextSceneId || "none"} 
            onValueChange={(value) => updateNextScene(value === "none" ? "" : value)}
          >
            <SelectTrigger id="nextScene" className="h-8 text-sm">
              <SelectValue placeholder="Select next scene" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (End or Choice-based)</SelectItem>
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
      )}

      {selectedScene.type === 'bad-ending' && updateRevivalPoint && (
        <div>
          <Label htmlFor="revivalPoint" className="text-xs flex items-center">
            <RotateCcw className="h-3 w-3 mr-1 text-red-500" /> Revival Point
          </Label>
          <Select 
            value={selectedScene.revivalPointId || "none"} 
            onValueChange={(value) => updateRevivalPoint(value === "none" ? "" : value)}
          >
            <SelectTrigger id="revivalPoint" className="h-8 text-sm">
              <SelectValue placeholder="Select revival point" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {story.scenes
                .filter(scene => scene.id !== selectedSceneId && scene.type !== 'bad-ending')
                .map(scene => (
                  <SelectItem key={scene.id} value={scene.id}>
                    {scene.title} ({scene.type})
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
        <Edit className="h-3 w-3" /> 
        <span>Set scene connections in the diagram, or switch to the Elements tab.</span>
      </div>
    </div>
  );
};

export default ScenePropertiesPanel;
