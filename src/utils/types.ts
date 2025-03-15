export interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
  type: 'interactive' | 'linear';
  characters: Character[];
  locations: Location[];
  scenes: Scene[];
  globalValues: GlobalValue[];
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

export interface Character {
  id: string;
  name: string;
  gender: string;
  role: string;
  bio: string;
  profilePicture?: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  scenes: string[];
  background?: string;
}

export type SceneType = 'normal' | 'start' | 'bad-ending';

export interface Scene {
  id: string;
  title: string;
  type: SceneType;
  locationId: string;
  elements: SceneElement[];
  nextSceneId?: string;
  revivalPointId?: string;
  position: { x: number; y: number };
}

export interface SceneElement {
  id: string;
  type: ElementType;
  order?: number;
}

export type ElementType = 'narration' | 'dialogue' | 'thought' | 'choice' | 'qte' | 'dialogueTask';

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
  question: string;
  options: ChoiceOption[];
}

export interface ChoiceOption {
  id: string;
  text: string;
  nextSceneId?: string;
  valueChanges?: ValueChange[];
}

export interface QteElement extends SceneElement {
  type: 'qte';
  description: string;
  keySequence: string;
  timeLimit: number;
  introText?: string;
  success: ElementOutcome;
  failure: ElementOutcome;
}

export interface ElementOutcome {
  sceneId?: string;
  valueChanges?: ValueChange[];
}

export interface GlobalValue {
  id: string;
  name: string;
  description: string;
  initialValue: number;
  currentValue?: number;
}

export interface ValueChange {
  valueId: string;
  change: number;
}

export interface DialogueTaskElement extends SceneElement {
  type: 'dialogueTask';
  goal: string;
  targetCharacterId: string;
  openingLine?: string;
  background?: string; // Added missing background property
  success: ElementOutcome;
  failure: ElementOutcome;
}
