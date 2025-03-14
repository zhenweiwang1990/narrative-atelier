
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStory } from './Layout';
import { Scene, SceneElement, ChoiceElement, QteElement, DialogueTaskElement, Character } from '@/utils/types';
import { ChevronRight, Clock, Keyboard } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface MobilePreviewProps {
  sceneId: string;
  onSceneChange: (sceneId: string) => void;
}

const MobilePreview = ({ sceneId, onSceneChange }: MobilePreviewProps) => {
  const { story } = useStory();
  const [currentElementIndex, setCurrentElementIndex] = useState<number>(-1);
  const [qteState, setQteState] = useState<{
    active: boolean;
    progress: number;
    currentCharIndex: number;
    keySequence: string;
  }>({
    active: false,
    progress: 0,
    currentCharIndex: 0,
    keySequence: '',
  });
  
  useEffect(() => {
    // Reset QTE state when scene changes
    setQteState({
      active: false,
      progress: 0,
      currentCharIndex: 0,
      keySequence: '',
    });
  }, [sceneId]);
  
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

  const startQte = (qteElement: QteElement) => {
    setQteState({
      active: true,
      progress: 0,
      currentCharIndex: 0,
      keySequence: qteElement.keySequence || 'ABC',
    });
    
    // Timer for QTE
    const timeLimit = (qteElement.timeLimit || 3) * 1000;
    const interval = 50; // Update progress every 50ms
    const steps = timeLimit / interval;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      
      if (newProgress >= 100) {
        clearInterval(timer);
        setQteState(prev => ({ ...prev, active: false }));
      } else {
        setQteState(prev => ({ ...prev, progress: newProgress }));
        // Show next character every 1/N of the time (where N is keySequence length)
        const seqLength = qteElement.keySequence?.length || 3;
        const characterStep = Math.floor(steps / seqLength);
        if (currentStep % characterStep === 0 && currentStep > 0) {
          const nextCharIndex = Math.floor(currentStep / characterStep);
          if (nextCharIndex < seqLength) {
            setQteState(prev => ({ ...prev, currentCharIndex: nextCharIndex }));
          }
        }
      }
    }, interval);
    
    return () => clearInterval(timer);
  };

  // Get character for dialogue/thought
  const getCharacter = (characterId: string): Character | undefined => {
    return story.characters.find(c => c.id === characterId);
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
        const speaker = getCharacter(currentElement.characterId);
        return (
          <div className="p-4">
            <div className="flex items-center mb-2">
              <Avatar className="h-8 w-8 mr-2">
                {speaker?.portrait ? (
                  <AvatarImage src={speaker.portrait} alt={speaker.name} />
                ) : (
                  <AvatarFallback>{speaker?.name?.charAt(0) || '?'}</AvatarFallback>
                )}
              </Avatar>
              <p className="text-xs font-bold">{speaker?.name || 'Unknown'}</p>
            </div>
            <p className="text-sm">{currentElement.text}</p>
          </div>
        );
      
      case 'thought':
        const thinker = getCharacter(currentElement.characterId);
        return (
          <div className="p-4">
            <div className="flex items-center mb-2">
              <Avatar className="h-8 w-8 mr-2">
                {thinker?.portrait ? (
                  <AvatarImage src={thinker.portrait} alt={thinker.name} />
                ) : (
                  <AvatarFallback>{thinker?.name?.charAt(0) || '?'}</AvatarFallback>
                )}
              </Avatar>
              <p className="text-xs font-bold text-purple-600">{thinker?.name}'s thoughts</p>
            </div>
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
        
        if (!qteState.active) {
          return (
            <div className="p-4">
              <p className="text-sm mb-3 font-bold text-amber-600">{qteElement.introText || 'Quick Time Event'}</p>
              <p className="text-sm mb-4">{qteElement.description}</p>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => startQte(qteElement)}
              >
                Start
              </Button>
            </div>
          );
        }
        
        return (
          <div className="p-4">
            <div className="flex justify-between mb-1">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{qteElement.timeLimit || 3}s</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Keyboard className="h-3 w-3 mr-1" />
                <span>{qteElement.keySequence || 'ABC'}</span>
              </div>
            </div>
            
            <Progress value={qteState.progress} className="h-2 mb-4" />
            
            <div className="flex justify-center items-center h-20">
              <div className="text-3xl font-bold">
                {qteState.keySequence.substring(0, qteState.currentCharIndex + 1)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button 
                variant="default" 
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setQteState({ active: false, progress: 0, currentCharIndex: 0, keySequence: '' });
                  handleChoiceSelect(qteElement.successSceneId);
                }}
              >
                Success
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  setQteState({ active: false, progress: 0, currentCharIndex: 0, keySequence: '' });
                  handleChoiceSelect(qteElement.failureSceneId);
                }}
              >
                Failure
              </Button>
            </div>
          </div>
        );
      
      case 'dialogueTask':
        const taskElement = currentElement as DialogueTaskElement;
        const targetCharacter = getCharacter(taskElement.targetCharacterId);
        return (
          <div className="p-4">
            <p className="text-sm mb-2 font-bold text-green-600">Dialogue Task</p>
            <p className="text-sm mb-1">Goal: {taskElement.goal}</p>
            
            <div className="flex items-center my-2">
              <Avatar className="h-8 w-8 mr-2">
                {targetCharacter?.portrait ? (
                  <AvatarImage src={targetCharacter.portrait} alt={targetCharacter.name} />
                ) : (
                  <AvatarFallback>{targetCharacter?.name?.charAt(0) || '?'}</AvatarFallback>
                )}
              </Avatar>
              <p className="text-xs mb-3 text-muted-foreground">With: {targetCharacter?.name || 'Unknown Character'}</p>
            </div>
            
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

  // Display transition narration after QTE or dialogue task
  const shouldShowTransition = () => {
    const prevElement = currentElementIndex > 0 ? sortedElements[currentElementIndex - 1] : null;
    if (!prevElement) return false;
    
    if (prevElement.type === 'qte' && (prevElement as QteElement).successTransition) {
      return true;
    }
    
    if (prevElement.type === 'dialogueTask' && (prevElement as DialogueTaskElement).successTransition) {
      return true;
    }
    
    return false;
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
                  (currentElement?.type === 'qte' && qteState.active) || 
                  currentElement?.type === 'dialogueTask'}
        >
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
};

export default MobilePreview;
