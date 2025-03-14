
import { useState, useEffect } from 'react';
import { 
  Character, 
  Scene, 
  SceneElement, 
  DialogueElement, 
  NarrationElement, 
  ThoughtElement, 
  ChoiceElement,
  QteElement,
  DialogueTaskElement,
  ElementType,
  ChoiceOption
} from '@/utils/types';
import { useStory } from './Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, MoveUp, MoveDown, AlignLeft, MessageSquare, Brain, ListTree, Gamepad, MessagesSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateId } from '@/utils/storage';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

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
        } as NarrationElement;
        break;
        
      case 'dialogue':
        newElement = {
          id: generateId('dialogue'),
          type: 'dialogue',
          order: newOrder,
          characterId: story.characters[0]?.id || '',
          text: 'Enter dialogue text here...'
        } as DialogueElement;
        break;
        
      case 'thought':
        newElement = {
          id: generateId('thought'),
          type: 'thought',
          order: newOrder,
          characterId: story.characters.find(c => c.role === 'protagonist')?.id || story.characters[0]?.id || '',
          text: 'Enter thought text here...'
        } as ThoughtElement;
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
        } as ChoiceElement;
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
        } as QteElement;
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
        } as DialogueTaskElement;
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

  // Get element icon
  const getElementIcon = (type: ElementType) => {
    switch (type) {
      case 'narration': return <AlignLeft className="h-4 w-4" />;
      case 'dialogue': return <MessageSquare className="h-4 w-4" />;
      case 'thought': return <Brain className="h-4 w-4" />;
      case 'choice': return <ListTree className="h-4 w-4" />;
      case 'qte': return <Gamepad className="h-4 w-4" />;
      case 'dialogueTask': return <MessagesSquare className="h-4 w-4" />;
    }
  };

  // Get element color class
  const getElementColorClass = (type: ElementType) => {
    switch (type) {
      case 'narration': return 'bg-gray-400';
      case 'dialogue': return 'bg-blue-400';
      case 'thought': return 'bg-purple-400';
      case 'choice': return 'bg-amber-400';
      case 'qte': return 'bg-red-400';
      case 'dialogueTask': return 'bg-green-400';
    }
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
              <AccordionItem 
                key={element.id} 
                value={element.id}
                className={cn(
                  "rounded-md border overflow-hidden", 
                  selectedElementId === element.id && "ring-2 ring-primary"
                )}
              >
                <div className="flex items-center space-x-2 p-2 bg-muted/20">
                  <div 
                    className={cn(
                      "w-4 h-4 rounded cursor-pointer",
                      getElementColorClass(element.type)
                    )}
                    onClick={() => onSelectElement && onSelectElement(element.id)}
                  />
                  
                  <AccordionTrigger className="hover:no-underline py-0 flex-1" onClick={() => onSelectElement && onSelectElement(element.id)}>
                    <div className="flex items-center space-x-2">
                      {getElementIcon(element.type)}
                      <h3 className="font-medium capitalize text-sm">{element.type}</h3>
                    </div>
                  </AccordionTrigger>
                  
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => moveElementUp(index)}
                      disabled={index === 0}
                    >
                      <MoveUp className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => moveElementDown(index)}
                      disabled={index === elements.length - 1}
                    >
                      <MoveDown className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6 text-destructive"
                      onClick={() => deleteElement(element.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <AccordionContent className="p-3 pt-2">
                  {/* Element content based on type */}
                  {element.type === 'narration' && (
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs">Text</Label>
                        <Textarea
                          value={(element as NarrationElement).text}
                          onChange={(e) => updateElement(element.id, { text: e.target.value })}
                          className="mt-1 text-sm"
                          rows={2}
                        />
                      </div>
                    </div>
                  )}
                  
                  {element.type === 'dialogue' && (
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs">Character</Label>
                        <Select 
                          value={(element as DialogueElement).characterId}
                          onValueChange={(value) => updateElement(element.id, { characterId: value })}
                        >
                          <SelectTrigger className="mt-1 h-8 text-xs">
                            <SelectValue placeholder="Select character" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {story.characters.map(character => (
                                <SelectItem key={character.id} value={character.id}>
                                  {character.name} {character.role === 'protagonist' ? '(Protagonist)' : ''}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-xs">Dialogue</Label>
                        <Textarea
                          value={(element as DialogueElement).text}
                          onChange={(e) => updateElement(element.id, { text: e.target.value })}
                          className="mt-1 text-sm"
                          rows={2}
                        />
                      </div>
                    </div>
                  )}
                  
                  {element.type === 'thought' && (
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs">Character</Label>
                        <Select 
                          value={(element as ThoughtElement).characterId}
                          onValueChange={(value) => updateElement(element.id, { characterId: value })}
                        >
                          <SelectTrigger className="mt-1 h-8 text-xs">
                            <SelectValue placeholder="Select character" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {story.characters.map(character => (
                                <SelectItem key={character.id} value={character.id}>
                                  {character.name} {character.role === 'protagonist' ? '(Protagonist)' : ''}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-xs">Thought</Label>
                        <Textarea
                          value={(element as ThoughtElement).text}
                          onChange={(e) => updateElement(element.id, { text: e.target.value })}
                          className="mt-1 text-sm"
                          rows={2}
                        />
                      </div>
                    </div>
                  )}
                  
                  {element.type === 'choice' && (
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs">Description</Label>
                        <Textarea
                          value={(element as ChoiceElement).text}
                          onChange={(e) => updateElement(element.id, { text: e.target.value })}
                          className="mt-1 text-sm"
                          rows={2}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <Label className="text-xs">Options</Label>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => addChoiceOption(element.id)}
                            disabled={(element as ChoiceElement).options.length >= 3}
                            className="h-6 text-xs"
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {(element as ChoiceElement).options.map((option, optIdx) => (
                            <div key={option.id} className="p-2 border rounded-md bg-muted/20">
                              <div className="flex justify-between items-start mb-1">
                                <Label className="text-xs">Option {optIdx + 1}</Label>
                                
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-5 w-5 text-destructive"
                                  onClick={() => deleteChoiceOption(element.id, option.id)}
                                  disabled={(element as ChoiceElement).options.length <= 1}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <Input
                                value={option.text}
                                onChange={(e) => updateChoiceOption(element.id, option.id, { text: e.target.value })}
                                className="mb-1 h-7 text-xs"
                                placeholder="Option text"
                              />
                              
                              <div>
                                <Label className="text-xs">Next Scene</Label>
                                <Select 
                                  value={option.nextSceneId}
                                  onValueChange={(value) => updateChoiceOption(element.id, option.id, { nextSceneId: value })}
                                >
                                  <SelectTrigger className="mt-1 h-7 text-xs">
                                    <SelectValue placeholder="Select next scene" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {story.scenes.map(scene => (
                                        <SelectItem key={scene.id} value={scene.id}>
                                          {scene.title} ({scene.type})
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {element.type === 'qte' && (
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs">Description</Label>
                        <Textarea
                          value={(element as QteElement).description}
                          onChange={(e) => updateElement(element.id, { description: e.target.value })}
                          className="mt-1 text-sm"
                          rows={2}
                        />
                      </div>
                      
                      <div>
                        <Label className="text-xs">Intro Text</Label>
                        <Input
                          value={(element as QteElement).introText || ''}
                          onChange={(e) => updateElement(element.id, { introText: e.target.value })}
                          className="mt-1 h-7 text-xs"
                          placeholder="Text shown before QTE starts"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Time Limit (3-6 seconds)</Label>
                          <Input
                            type="number"
                            min={3}
                            max={6}
                            value={(element as QteElement).timeLimit || 3}
                            onChange={(e) => updateElement(element.id, { 
                              timeLimit: validateTimeLimit(parseInt(e.target.value, 10)) 
                            })}
                            className="mt-1 h-7 text-xs"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-xs">Key Sequence (3-6 chars)</Label>
                          <Input
                            value={(element as QteElement).keySequence || ''}
                            onChange={(e) => updateElement(element.id, { 
                              keySequence: validateKeySequence(e.target.value) 
                            })}
                            className="mt-1 h-7 text-xs"
                            maxLength={6}
                            placeholder="ABC"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Success Scene</Label>
                          <Select 
                            value={(element as QteElement).successSceneId}
                            onValueChange={(value) => updateElement(element.id, { successSceneId: value })}
                          >
                            <SelectTrigger className="mt-1 h-8 text-xs">
                              <SelectValue placeholder="Select scene" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {story.scenes.map(scene => (
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
                            value={(element as QteElement).failureSceneId}
                            onValueChange={(value) => updateElement(element.id, { failureSceneId: value })}
                          >
                            <SelectTrigger className="mt-1 h-8 text-xs">
                              <SelectValue placeholder="Select scene" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {story.scenes.map(scene => (
                                  <SelectItem key={scene.id} value={scene.id}>
                                    {scene.title} ({scene.type})
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <Collapsible className="border rounded-md p-2 bg-muted/20">
                        <CollapsibleTrigger className="flex items-center justify-between w-full text-xs font-medium">
                          Transition Texts <ChevronDown className="h-3 w-3" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pt-2 space-y-2">
                          <div>
                            <Label className="text-xs">Success Transition</Label>
                            <Textarea
                              value={(element as QteElement).successTransition || ''}
                              onChange={(e) => updateElement(element.id, { successTransition: e.target.value })}
                              className="mt-1 text-sm"
                              rows={2}
                              placeholder="Narration after success"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Failure Transition</Label>
                            <Textarea
                              value={(element as QteElement).failureTransition || ''}
                              onChange={(e) => updateElement(element.id, { failureTransition: e.target.value })}
                              className="mt-1 text-sm"
                              rows={2}
                              placeholder="Narration after failure"
                            />
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  )}
                  
                  {element.type === 'dialogueTask' && (
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs">Goal</Label>
                        <Input
                          value={(element as DialogueTaskElement).goal}
                          onChange={(e) => updateElement(element.id, { goal: e.target.value })}
                          className="mt-1 h-7 text-xs"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-xs">Target Character</Label>
                        <Select 
                          value={(element as DialogueTaskElement).targetCharacterId}
                          onValueChange={(value) => updateElement(element.id, { targetCharacterId: value })}
                        >
                          <SelectTrigger className="mt-1 h-8 text-xs">
                            <SelectValue placeholder="Select character" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {story.characters.map(character => (
                                <SelectItem key={character.id} value={character.id}>
                                  {character.name} {character.role === 'protagonist' ? '(Protagonist)' : ''}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-xs">Opening Line</Label>
                        <Textarea
                          value={(element as DialogueTaskElement).openingLine || ''}
                          onChange={(e) => updateElement(element.id, { openingLine: e.target.value })}
                          className="mt-1 text-sm"
                          rows={2}
                          placeholder="What does this character say first?"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-xs">Background</Label>
                        <Textarea
                          value={(element as DialogueTaskElement).background}
                          onChange={(e) => updateElement(element.id, { background: e.target.value })}
                          className="mt-1 text-sm"
                          rows={2}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Success Scene</Label>
                          <Select 
                            value={(element as DialogueTaskElement).successSceneId}
                            onValueChange={(value) => updateElement(element.id, { successSceneId: value })}
                          >
                            <SelectTrigger className="mt-1 h-8 text-xs">
                              <SelectValue placeholder="Select scene" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {story.scenes.map(scene => (
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
                            value={(element as DialogueTaskElement).failureSceneId}
                            onValueChange={(value) => updateElement(element.id, { failureSceneId: value })}
                          >
                            <SelectTrigger className="mt-1 h-8 text-xs">
                              <SelectValue placeholder="Select scene" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {story.scenes.map(scene => (
                                  <SelectItem key={scene.id} value={scene.id}>
                                    {scene.title} ({scene.type})
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <Collapsible className="border rounded-md p-2 bg-muted/20">
                        <CollapsibleTrigger className="flex items-center justify-between w-full text-xs font-medium">
                          Transition Texts <ChevronDown className="h-3 w-3" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pt-2 space-y-2">
                          <div>
                            <Label className="text-xs">Success Transition</Label>
                            <Textarea
                              value={(element as DialogueTaskElement).successTransition || ''}
                              onChange={(e) => updateElement(element.id, { successTransition: e.target.value })}
                              className="mt-1 text-sm"
                              rows={2}
                              placeholder="Narration after success"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Failure Transition</Label>
                            <Textarea
                              value={(element as DialogueTaskElement).failureTransition || ''}
                              onChange={(e) => updateElement(element.id, { failureTransition: e.target.value })}
                              className="mt-1 text-sm"
                              rows={2}
                              placeholder="Narration after failure"
                            />
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default ElementEditor;
