
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { Scene } from '@/utils/types';

interface SceneEndingProps {
  scene: Scene;
  handleRevival: () => void;
}

const SceneEnding: React.FC<SceneEndingProps> = ({ scene, handleRevival }) => {
  if (scene.type === 'bad-ending') {
    return (
      <div className="p-4 text-center">
        <p className="text-sm font-bold text-red-600 mb-3">Bad Ending</p>
        <p className="text-sm mb-4">The story has reached a negative conclusion.</p>
        {scene.revivalPointId && (
          <Button 
            variant="default"
            size="sm"
            className="bg-amber-600 hover:bg-amber-700"
            onClick={handleRevival}
          >
            <RotateCcw className="h-4 w-4 mr-2" /> Revive from checkpoint
          </Button>
        )}
      </div>
    );
  } else if (scene.type === 'ending') {
    return (
      <div className="p-4 text-center">
        <p className="text-sm font-bold text-green-600 mb-3">Ending</p>
        <p className="text-sm">Congratulations! You have completed this story path.</p>
      </div>
    );
  } else if (!scene.nextSceneId) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">End of this scene. No next scene is defined.</p>
      </div>
    );
  }
  
  return null;
};

export default SceneEnding;
