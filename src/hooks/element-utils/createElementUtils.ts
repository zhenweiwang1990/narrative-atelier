
import { ElementType, Story, SceneElement, ElementOutcome, QteElement, DialogueTaskElement, NarrationElement, DialogueElement, ThoughtElement, ChoiceElement } from '@/utils/types';
import { generateId } from '@/utils/storage';

// Helper to create a new element of specified type
export const createNewElement = (type: ElementType, story: Story): Partial<SceneElement> => {
  const elementId = generateId('element');
  
  const baseElement = {
    id: elementId,
    type
  };
  
  switch (type) {
    case 'narration':
      return {
        ...baseElement,
        text: '在这里输入场景描述...'
      } as Partial<NarrationElement>;
      
    case 'dialogue':
      // Select the first character or empty if none exist
      const dialogueCharacter = story.characters.length > 0 ? story.characters[0].id : '';
      return {
        ...baseElement,
        characterId: dialogueCharacter,
        text: '在这里输入对话...'
      } as Partial<DialogueElement>;
      
    case 'thought':
      // Select the first character or empty if none exist
      const thoughtCharacter = story.characters.length > 0 ? story.characters[0].id : '';
      return {
        ...baseElement,
        characterId: thoughtCharacter,
        text: '在这里输入角色的内心想法...'
      } as Partial<ThoughtElement>;
      
    case 'choice':
      return {
        ...baseElement,
        text: '在这里输入选择提示...',
        options: [
          {
            id: generateId('option'),
            text: '选项 1',
            nextSceneId: ''
          },
          {
            id: generateId('option'),
            text: '选项 2',
            nextSceneId: ''
          }
        ]
      } as Partial<ChoiceElement>;
      
    case 'qte':
      const defaultSuccess: ElementOutcome = {
        sceneId: '',
        transition: '',
        valueChanges: []
      };
      const defaultFailure: ElementOutcome = {
        sceneId: '',
        transition: '',
        valueChanges: []
      };
      
      return {
        ...baseElement,
        description: '玩家必须在时间限制内完成要求',
        introText: '快速反应!',
        qteType: 'action', // Default to action type
        keySequence: 'ABC', // For action type
        directionSequence: 'UDLR', // For combo type
        unlockPattern: 'Z', // For unlock type
        timeLimit: 3,
        success: defaultSuccess,
        failure: defaultFailure,
        isDoubleChar: false // Default to single character mode
      } as Partial<QteElement>;
      
    case 'dialogueTask':
      const targetCharacter = story.characters.length > 0 ? story.characters[0].id : '';
      const taskSuccess: ElementOutcome = {
        sceneId: '',
        transition: '',
        valueChanges: []
      };
      const taskFailure: ElementOutcome = {
        sceneId: '',
        transition: '',
        valueChanges: []
      };
      
      return {
        ...baseElement,
        goal: '说服角色...',
        targetCharacterId: targetCharacter,
        background: '对话发生的背景...',
        openingLine: '目标角色的第一句话...',
        success: taskSuccess,
        failure: taskFailure
      } as Partial<DialogueTaskElement>;
      
    default:
      return baseElement;
  }
};
