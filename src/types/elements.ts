
import { ValueChange } from './values';
import { UnlockCondition } from './values';

export type ElementType = 'narration' | 'dialogue' | 'thought' | 'choice' | 'qte' | 'dialogueTask';

export interface SceneElement {
  id: string;
  type: ElementType;
  order?: number;
  text?: string;
  characterId?: string;
  description?: string;
  goal?: string;
  openingLine?: string;
  options?: ChoiceOption[];
  success?: ElementOutcome;
  failure?: ElementOutcome;
  soundEffect?: {
    category: string;
    name: string;
    url: string;
  };
}

export interface NarrationElement extends SceneElement {
  type: 'narration';
  text: string;
}

export interface DialogueElement extends SceneElement {
  type: 'dialogue';
  characterId: string;
  text: string;
}

export interface ThoughtElement extends SceneElement {
  type: 'thought';
  characterId: string;
  text: string;
}

export interface ChoiceElement extends SceneElement {
  type: 'choice';
  text: string;
  options: ChoiceOption[];
}

export interface ChoiceOption {
  id: string;
  text: string;
  nextSceneId?: string;
  valueChanges?: ValueChange[];
  locked?: boolean;
  unlockPrice?: number;
  unlockConditions?: UnlockCondition[];
}

export interface QteElement extends SceneElement {
  type: 'qte';
  description: string;
  qteType: 'action' | 'combo' | 'unlock';
  keySequence?: string | string[];
  directionSequence?: string;
  unlockPattern?: 'C' | 'L' | 'M' | 'N' | 'O' | 'S' | 'U' | 'Z';
  timeLimit: number;
  introText?: string;
  success: ElementOutcome;
  failure: ElementOutcome;
  isDoubleChar?: boolean;
}

export interface ElementOutcome {
  sceneId?: string;
  valueChanges?: ValueChange[];
  transition?: string;
}

export interface DialogueTaskElement extends SceneElement {
  type: 'dialogueTask';
  goal: string;
  targetCharacterId: string;
  openingLine?: string;
  background?: string;
  characterIntro?: string;
  dialogueTopics?: string[];
  success: ElementOutcome;
  failure: ElementOutcome;
}
