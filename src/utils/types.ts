
export type StoryType = 'interactive' | 'linear' | 'branching';
export type SceneType = 'start' | 'normal' | 'branching' | 'ending' | 'bad-ending' | 'convergence';
export type ElementType = 'narration' | 'dialogue' | 'thought' | 'choice' | 'qte' | 'dialogueTask';
export type CharacterGender = 'male' | 'female' | 'other';
export type CharacterRole = 'protagonist' | 'supporting';

export interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
  type: StoryType;
  scenes: Scene[];
  characters: Character[];
  locations: Location[];
  globalValues: GlobalValue[];
  coverPhoto?: string;
  protagonistName?: string;
  protagonistGender?: string;
  orientation?: 'hetero' | 'yuri' | 'yaoi' | 'none';
  tags?: string[];
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  originalContent: string;
  mainStoryContent?: string;
  markedContent?: string;
  isProcessed: boolean;
  isConverted: boolean;
}

export interface Scene {
  id: string;
  title: string;
  type: SceneType;
  elements: SceneElement[];
  position: { x: number; y: number };
  description?: string;
  convergenceTarget?: string;
  locationId?: string;
  nextSceneId?: string;
  revivalPointId?: string;
}

export interface SceneElement {
  id: string;
  type: ElementType;
  text?: string;
  characterId?: string;
  options?: ChoiceOption[];
  description?: string;
  timeLimit?: number;
  keySequence?: string;
  success?: ElementOutcome;
  failure?: ElementOutcome;
  goal?: string;
  openingLine?: string;
  introText?: string;
  targetCharacterId?: string;
}

export interface ChoiceOption {
  id: string;
  text: string;
  target?: string;
  nextSceneId?: string;
  sceneTarget?: string;
  outcome?: 'success' | 'failure';
  valueChanges?: ValueChange[];
}

export interface Character {
  id: string;
  name: string;
  description?: string;
  gender?: CharacterGender;
  role?: CharacterRole;
  bio?: string;
  portrait?: string;
  fullBody?: string;
  image?: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  image?: string;
  background?: string;
  scenes?: string[];
}

export interface GlobalValue {
  id: string;
  name: string;
  type: 'number' | 'boolean' | 'text';
  initialValue: any;
  currentValue?: any;
}

export interface ValueChange {
  valueId: string;
  change: number;
}

export interface ElementOutcome {
  sceneId?: string;
  transition?: string;
  valueChanges?: ValueChange[];
}

// Element-specific interfaces
export interface NarrationElement extends SceneElement {
  type: 'narration';
  text: string;
}

export interface DialogueElement extends SceneElement {
  type: 'dialogue';
  text: string;
  characterId: string;
}

export interface ThoughtElement extends SceneElement {
  type: 'thought';
  text: string;
  characterId: string;
}

export interface ChoiceElement extends SceneElement {
  type: 'choice';
  text: string;
  options: ChoiceOption[];
}

export interface QteElement extends SceneElement {
  type: 'qte';
  description: string;
  timeLimit: number;
  keySequence: string;
  success: ElementOutcome;
  failure: ElementOutcome;
}

export interface DialogueTaskElement extends SceneElement {
  type: 'dialogueTask';
  characterId: string;
  goal: string;
  openingLine: string;
  success: ElementOutcome;
  failure: ElementOutcome;
}
