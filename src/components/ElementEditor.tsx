
import { useState, useEffect } from 'react';
import { 
  Character, 
  Scene, 
  SceneElement, 
  ElementType,
  ChoiceOption,
  ChoiceElement
} from '@/utils/types';
import { useStory } from './Layout';
import { Button } from '@/components/ui/button';
import { Accordion } from '@/components/ui/accordion';
import { AlignLeft, MessageSquare, Brain, ListTree, Gamepad, MessagesSquare, Plus } from 'lucide-react';
import { generateId } from '@/utils/storage';
import { ElementContainer } from './elements/ElementContainer';

interface ElementEditorProps {
  sceneId: string;
  selectedElementId?: string;
  onSelectElement?: (id: string) => void;
}

const ElementEditor = ({ sceneId, selectedElementId, onSelectElement }: ElementEditorProps) => {
  const { story, setStory } = useStory();
  const [elements, setElements] = useState<SceneElement[]>([]);
  
  // Get current scene and its elements
  useEffect(() => {
    if (!story) return;
    
    const currentScene = story.scenes.find(scene => scene.id === sceneId);
    if (currentScene) {
      // Sort elements by order
      const sortedElements = [...currentScene.elements].sort((a, b) => a.order - b.order);
      setElements(sortedElements);
    }
  }, [story, sceneId]);

  // Update story when elements change
  const updateStory = (updatedElements: SceneElement[]) => {
    if (!story || !setStory) return;
    
    // Sort by order before saving
    const sortedElements = [...updatedElements].sort((a, b) => a.order - b.order);
    
    const updatedScenes = story.scenes.map(scene => {
      if (scene.id === sceneId) {
        return {
          ...scene,
          elements: sortedElements
        };
      }
      return scene;
    });
    
    setStory({
      ...story,
      scenes: updatedScenes
    });
  };

  // Add new element
  const addElement = (type: ElementType) => {
    if (!story) return;
    
    const currentScene = story.scenes.find(scene => scene.id === sceneId);
    if (!currentScene) return;
    
    const newOrder = elements.length > 0 
      ? Math.max(...elements.map(e => e.order)) + 1 
      : 0;
    
    let newElement: SceneElement;
    
    switch (type) {
      case 'narration':
        newElement = {
          id: generateId('narration'),
          type: 'narration',
          order: newOrder,
          text: 'Enter narration text here...'
        } as SceneElement;
        break;
        
      case 'dialogue':
        newElement = {
          id: generateId('dialogue'),
          type: 'dialogue',
          order: newOrder,
          characterId: story.characters[0]?.id || '',
          text: 'Enter dialogue text here...'
        } as SceneElement;
        break;
        
      case 'thought':
        newElement = {
          id: generateId('thought'),
          type: 'thought',
          order: newOrder,
          characterId: story.characters.find(c => c.role === 'protagonist')?.id || story.characters[0]?.id || '',
          text: 'Enter thought text here...'
        } as SceneElement;
        break;
        
      case 'choice':
        newElement = {
          id: generateId('choice'),
          type: 'choice',
          order: newOrder,
          text: 'Enter choice description here...',
          options: [
            {
              id: generateId('option'),
              text: 'Option 1',
              nextSceneId: ''
            }
          ]
        } as SceneElement;
        break;
        
      case 'qte':
        newElement = {
          id: generateId('qte'),
          type: 'qte',
          order: newOrder,
          description: 'Enter QTE description here...',
          introText: 'Get ready...',
          timeLimit: 3,
          keySequence: 'ABC',
          successSceneId: '',
          failureSceneId: '',
          successTransition: 'You succeeded!',
          failureTransition: 'You failed!'
        } as SceneElement;
        break;
        
      case 'dialogueTask':
        newElement = {
          id: generateId('dialogueTask'),
          type: 'dialogueTask',
          order: newOrder,
          goal: 'Enter dialogue goal here...',
          targetCharacterId: story.characters.find(c => c.role !== 'protagonist')?.id || '',
          background: 'Enter background information here...',
          openingLine: 'Enter the opening line from this character...',
          successSceneId: '',
          failureSceneId: '',
          successTransition: 'The conversation went well.',
          failureTransition: 'The conversation did not go as planned.'
        } as SceneElement;
        break;
        
      default:
        return;
    }
    
    const updatedElements = [...elements, newElement];
    setElements(updatedElements as SceneElement[]);
    updateStory(updatedElements as SceneElement[]);
    
    // Auto-select the new element
    if (onSelectElement) {
      onSelectElement(newElement.id);
    }
  };

  // Delete element
  const deleteElement = (id: string) => {
    const updatedElements = elements.filter(e => e.id !== id);
    // Reorder remaining elements
    const reorderedElements = updatedElements.map((elem, index) => ({
      ...elem,
      order: index
    })) as SceneElement[];
    
    setElements(reorderedElements);
    updateStory(reorderedElements);
    
    // Clear selection if the deleted element was selected
    if (selectedElementId === id && onSelectElement) {
      onSelectElement('');
    }
  };

  // Move element up
  const moveElementUp = (index: number) => {
    if (index <= 0) return;
    
    const newElements = [...elements];
    
    // Swap order property
    const temp = newElements[index].order;
    newElements[index].order = newElements[index - 1].order;
    newElements[index - 1].order = temp;
    
    // Swap positions in array
    [newElements[index], newElements[index - 1]] = [newElements[index - 1], newElements[index]];
    
    setElements([...newElements] as SceneElement[]);
    updateStory([...newElements] as SceneElement[]);
  };

  // Move element down
  const moveElementDown = (index: number) => {
    if (index >= elements.length - 1) return;
    
    const newElements = [...elements];
    
    // Swap order property
    const temp = newElements[index].order;
    newElements[index].order = newElements[index + 1].order;
    newElements[index + 1].order = temp;
    
    // Swap positions in array
    [newElements[index], newElements[index + 1]] = [newElements[index + 1], newElements[index]];
    
    setElements([...newElements] as SceneElement[]);
    updateStory([...newElements] as SceneElement[]);
  };

  // Update element
  const updateElement = (id: string, updatedElement: Partial<SceneElement>) => {
    const newElements = elements.map(elem => {
      if (elem.id === id) {
        return { ...elem, ...updatedElement };
      }
      return elem;
    });
    
    setElements([...newElements] as SceneElement[]);
    updateStory([...newElements] as SceneElement[]);
  };

  // Add choice option
  const addChoiceOption = (elementId: string) => {
    const element = elements.find(e => e.id === elementId) as ChoiceElement;
    if (!element || element.type !== 'choice') return;
    
    const newOption: ChoiceOption = {
      id: generateId('option'),
      text: `Option ${element.options.length + 1}`,
      nextSceneId: ''
    };
    
    const updatedElement: ChoiceElement = {
      ...element,
      options: [...element.options, newOption]
    };
    
    updateElement(elementId, updatedElement);
  };

  // Delete choice option
  const deleteChoiceOption = (elementId: string, optionId: string) => {
    const element = elements.find(e => e.id === elementId) as ChoiceElement;
    if (!element || element.type !== 'choice' || element.options.length <= 1) return;
    
    const updatedElement: ChoiceElement = {
      ...element,
      options: element.options.filter(opt => opt.id !== optionId)
    };
    
    updateElement(elementId, updatedElement);
  };

  // Update choice option
  const updateChoiceOption = (elementId: string, optionId: string, updates: Partial<ChoiceOption>) => {
    const element = elements.find(e => e.id === elementId) as ChoiceElement;
    if (!element || element.type !== 'choice') return;
    
    const updatedOptions = element.options.map(opt => {
      if (opt.id === optionId) {
        return { ...opt, ...updates };
      }
      return opt;
    });
    
    const updatedElement: ChoiceElement = {
      ...element,
      options: updatedOptions
    };
    
    updateElement(elementId, updatedElement);
  };

  // Validate QTE time limit (3-6 seconds)
  const validateTimeLimit = (value: number): number => {
    if (value < 3) return 3;
    if (value > 6) return 6;
    return value;
  };

  // Validate QTE key sequence (3-6 chars)
  const validateKeySequence = (value: string): string => {
    if (value.length < 3) return value.padEnd(3, 'A');
    if (value.length > 6) return value.substring(0, 6);
    return value;
  };

  if (!story) return null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => addElement('narration')}
          className="flex items-center text-xs h-7"
        >
          <AlignLeft className="h-3 w-3 mr-1" /> Narration
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => addElement('dialogue')}
          className="flex items-center text-xs h-7"
        >
          <MessageSquare className="h-3 w-3 mr-1" /> Dialogue
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => addElement('thought')}
          className="flex items-center text-xs h-7"
        >
          <Brain className="h-3 w-3 mr-1" /> Thought
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => addElement('choice')}
          className="flex items-center text-xs h-7"
        >
          <ListTree className="h-3 w-3 mr-1" /> Choice
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => addElement('qte')}
          className="flex items-center text-xs h-7"
        >
          <Gamepad className="h-3 w-3 mr-1" /> QTE
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => addElement('dialogueTask')}
          className="flex items-center text-xs h-7"
        >
          <MessagesSquare className="h-3 w-3 mr-1" /> Dialogue Task
        </Button>
      </div>
      
      <div className="space-y-2 overflow-y-auto h-[calc(100vh-14rem)]">
        {elements.length === 0 ? (
          <div className="text-center py-6 bg-muted/30 rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">No elements yet. Add your first scene element.</p>
          </div>
        ) : (
          <Accordion 
            type="multiple" 
            className="space-y-2"
            value={selectedElementId ? [selectedElementId] : []}
          >
            {elements.map((element, index) => (
              <ElementContainer
                key={element.id}
                element={element}
                index={index}
                totalElements={elements.length}
                selectedElementId={selectedElementId}
                characters={story.characters}
                scenes={story.scenes}
                onSelect={onSelectElement ? onSelectElement : () => {}}
                onMoveUp={moveElementUp}
                onMoveDown={moveElementDown}
                onDelete={deleteElement}
                onUpdate={updateElement}
                onAddChoiceOption={addChoiceOption}
                onDeleteChoiceOption={deleteChoiceOption}
                onUpdateChoiceOption={updateChoiceOption}
                validateTimeLimit={validateTimeLimit}
                validateKeySequence={validateKeySequence}
              />
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default ElementEditor;
