
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStory } from './Layout';
import { ChevronRight } from 'lucide-react';
import PreviewElement from './preview/PreviewElement';
import SceneEnding from './preview/SceneEnding';
import { usePreviewState } from './preview/usePreviewState';

interface MobilePreviewProps {
  sceneId: string;
  onSceneChange: (sceneId: string) => void;
}

const MobilePreview = ({ sceneId, onSceneChange }: MobilePreviewProps) => {
  const { story } = useStory();
  
  if (!story) return null;
  
  const {
    scene,
    location,
    currentElement,
    isSceneEnding,
    handleNext,
    handleChoiceSelect,
    handleRevival,
    getCharacter
  } = usePreviewState(sceneId, story, onSceneChange);
  
  if (!scene) return null;
  
  const locationBackground = location?.background || '/placeholder.svg';
  
  return (
    <Card className="w-full h-full border overflow-hidden flex flex-col bg-white">
      <div 
        className="h-[45%] bg-cover bg-center border-b"
        style={{ backgroundImage: `url(${locationBackground})` }}
      />
      
      <div className="flex-1 overflow-auto">
        {isSceneEnding && currentElement ? (
          <SceneEnding scene={scene} handleRevival={handleRevival} />
        ) : (
          <div>
            {!currentElement && location && (
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Location: {location.name || 'Unknown'}</p>
              </div>
            )}
            <PreviewElement
              currentElement={currentElement}
              handleNext={handleNext}
              handleChoiceSelect={handleChoiceSelect}
              getCharacter={getCharacter}
            />
          </div>
        )}
      </div>
      
      <div className="p-3 border-t">
        <Button 
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={handleNext}
          disabled={currentElement?.type === 'choice' || 
                  currentElement?.type === 'qte' || 
                  currentElement?.type === 'dialogueTask' ||
                  (isSceneEnding && scene.type === 'bad-ending' && !!scene.revivalPointId)}
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
};

export default MobilePreview;
