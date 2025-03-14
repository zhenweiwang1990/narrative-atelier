
import React from 'react';
import { Label } from '@/components/ui/label';
import { Scene } from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SceneSelectSectionProps {
  successSceneId: string;
  failureSceneId: string;
  scenes: Scene[];
  onUpdateSuccessScene: (sceneId: string) => void;
  onUpdateFailureScene: (sceneId: string) => void;
}

const SceneSelectSection: React.FC<SceneSelectSectionProps> = ({
  successSceneId,
  failureSceneId,
  scenes,
  onUpdateSuccessScene,
  onUpdateFailureScene
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <Label className="text-xs">Success Scene</Label>
        <Select 
          value={successSceneId}
          onValueChange={onUpdateSuccessScene}
        >
          <SelectTrigger className="mt-1 h-8 text-xs">
            <SelectValue placeholder="Select scene" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {scenes.map(scene => (
                <SelectItem key={scene.id} value={scene.id}>
                  {scene.title} ({scene.type})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label className="text-xs">Failure Scene</Label>
        <Select 
          value={failureSceneId}
          onValueChange={onUpdateFailureScene}
        >
          <SelectTrigger className="mt-1 h-8 text-xs">
            <SelectValue placeholder="Select scene" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {scenes.map(scene => (
                <SelectItem key={scene.id} value={scene.id}>
                  {scene.title} ({scene.type})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SceneSelectSection;
