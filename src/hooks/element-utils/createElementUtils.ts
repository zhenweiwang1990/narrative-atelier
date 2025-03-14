
import { 
  SceneElement, 
  ElementType, 
  Story 
} from '@/utils/types';
import { generateId } from '@/utils/storage';

// Create element based on type
export const createNewElement = (
  type: ElementType, 
  story: Story, 
  elementsLength: number
): SceneElement => {
  const newOrder = elementsLength > 0 
    ? Math.max(...Array.from({ length: elementsLength }, (_, i) => i)) + 1 
    : 0;
  
  switch (type) {
    case 'narration':
      return {
        id: generateId('narration'),
        type: 'narration',
        order: newOrder,
        text: 'Enter narration text here...'
      } as SceneElement;
      
    case 'dialogue':
      return {
        id: generateId('dialogue'),
        type: 'dialogue',
        order: newOrder,
        characterId: story.characters[0]?.id || '',
        text: 'Enter dialogue text here...'
      } as SceneElement;
      
    case 'thought':
      return {
        id: generateId('thought'),
        type: 'thought',
        order: newOrder,
        characterId: story.characters.find(c => c.role === 'protagonist')?.id || story.characters[0]?.id || '',
        text: 'Enter thought text here...'
      } as SceneElement;
      
    case 'choice':
      return {
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
      
    case 'qte':
      return {
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
      
    case 'dialogueTask':
      return {
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
      
    default:
      throw new Error(`Unsupported element type: ${type}`);
  }
};
