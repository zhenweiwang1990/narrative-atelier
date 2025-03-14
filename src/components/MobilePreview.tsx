
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStory } from './Layout';
import { Scene, SceneElement, ChoiceElement, QteElement, DialogueTaskElement } from '@/utils/types';
import { ChevronRight } from 'lucide-react';

interface MobilePreviewProps {
  sceneId: string;
  onSceneChange: (sceneId: string) => void;
}

const MobilePreview = ({ sceneId, onSceneChange }: MobilePreviewProps) => {
  const { story } = useStory();
  const [currentElementIndex, setCurrentElementIndex] = useState<number>(-1);
  
  if (!story) return null;
  
  const scene = story.scenes.find(s => s.id === sceneId);
  if (!scene) return null;
  
  const location = story.locations.find(l => l.id === scene.locationId);
  const locationBackground = location?.background || '/placeholder.svg';
  
  const sortedElements = [...scene.elements].sort((a, b) => a.order - b.order);
  const currentElement = currentElementIndex >= 0 && currentElementIndex < sortedElements.length 
    ? sortedElements[currentElementIndex] 
    : null;

  const handleNext = () => {
    if (currentElementIndex < sortedElements.length - 1) {
      setCurrentElementIndex(currentElementIndex + 1);
    } else if (scene.nextSceneId) {
      // Move to next scene
      onSceneChange(scene.nextSceneId);
      setCurrentElementIndex(-1);
    }
  };

  const handleChoiceSelect = (nextSceneId: string) => {
    if (nextSceneId) {
      onSceneChange(nextSceneId);
      setCurrentElementIndex(-1);
    }
  };

  const renderCurrentElement = () => {
    if (!currentElement) {
      return (
        <div className="p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">Location: {location?.name || 'Unknown'}</p>
          <p className="text-sm">Click Next to start the scene</p>
        </div>
      );
    }

    switch (currentElement.type) {
      case 'narration':
        return (
          <div className="p-4">
            <p className="text-sm">{currentElement.text}</p>
          </div>
        );
      
      case 'dialogue':
        const speaker = story.characters.find(c => c.id === currentElement.characterId);
        return (
          <div className="p-4">
            <p className="text-xs font-bold mb-1">{speaker?.name || 'Unknown'}</p>
            <p className="text-sm">{currentElement.text}</p>
          </div>
        );
      
      case 'thought':
        const thinker = story.characters.find(c => c.id === currentElement.characterId);
        return (
          <div className="p-4">
            <p className="text-xs font-bold text-purple-600 mb-1">{thinker?.name}'s thoughts</p>
            <p className="text-sm italic text-purple-700">{currentElement.text}</p>
          </div>
        );
      
      case 'choice':
        return (
          <div className="p-4">
            <p className="text-sm mb-3">{currentElement.text}</p>
            <div className="space-y-2">
              {(currentElement as ChoiceElement).options.map(option => (
                <Button 
                  key={option.id} 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-left h-auto py-2 text-sm"
                  onClick={() => handleChoiceSelect(option.nextSceneId)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </div>
        );
      
      case 'qte':
        const qteElement = currentElement as QteElement;
        return (
          <div className="p-4">
            <p className="text-sm mb-3 font-bold text-amber-600">Quick Time Event</p>
            <p className="text-sm mb-4">{qteElement.description}</p>
            <div className="flex space-x-2">
              <Button 
                variant="default" 
                size="sm" 
                className="bg-green-600 hover:bg-green-700 flex-1"
                onClick={() => handleChoiceSelect(qteElement.successSceneId)}
              >
                Success
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-red-600 hover:bg-red-700 flex-1"
                onClick={() => handleChoiceSelect(qteElement.failureSceneId)}
              >
                Failure
              </Button>
            </div>
          </div>
        );
      
      case 'dialogueTask':
        const taskElement = currentElement as DialogueTaskElement;
        const targetCharacter = story.characters.find(c => c.id === taskElement.targetCharacterId);
        return (
          <div className="p-4">
            <p className="text-sm mb-2 font-bold text-green-600">Dialogue Task</p>
            <p className="text-sm mb-1">Goal: {taskElement.goal}</p>
            <p className="text-xs mb-3 text-muted-foreground">With: {targetCharacter?.name || 'Unknown Character'}</p>
            
            {taskElement.openingLine && (
              <div className="mb-3 p-2 bg-muted/20 rounded-md">
                <p className="text-xs font-medium">{targetCharacter?.name || 'Character'}:</p>
                <p className="text-sm">{taskElement.openingLine}</p>
              </div>
            )}
            
            <div className="flex space-x-2 mt-4">
              <Button 
                variant="default" 
                size="sm" 
                className="bg-green-600 hover:bg-green-700 flex-1"
                onClick={() => handleChoiceSelect(taskElement.successSceneId)}
              >
                Success
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-red-600 hover:bg-red-700 flex-1"
                onClick={() => handleChoiceSelect(taskElement.failureSceneId)}
              >
                Failure
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="w-full h-full border overflow-hidden flex flex-col bg-white">
      <div 
        className="h-[45%] bg-cover bg-center border-b"
        style={{ backgroundImage: `url(${locationBackground})` }}
      />
      
      <div className="flex-1 overflow-auto">
        {renderCurrentElement()}
      </div>
      
      <div className="p-3 border-t">
        <Button 
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={handleNext}
          disabled={currentElement?.type === 'choice' || 
                   currentElement?.type === 'qte' || 
                   currentElement?.type === 'dialogueTask'}
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
};

export default MobilePreview;
