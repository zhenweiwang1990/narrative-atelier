
// Character Types
export type CharacterGender = 'male' | 'female' | 'other';
export type CharacterRole = 'protagonist' | 'supporting';

export interface Character {
  id: string;
  name: string;
  gender: CharacterGender;
  role: CharacterRole;
  portrait?: string; // URL to portrait image
  fullBody?: string; // URL to full body image
  bio: string;
}

// Location Types
export interface Location {
  id: string;
  name: string;
  background?: string; // URL to background image
  description: string;
  scenes: string[]; // IDs of associated scenes
}

// Global Value Type
export interface GlobalValue {
  id: string;
  name: string;
  initialValue: number;
  currentValue?: number; // Used in preview
}

// ValueChange for elements that can modify global values
export interface ValueChange {
  valueId: string;
  change: number; // Can be positive or negative
}

// Outcome for elements with success/failure paths
export interface ElementOutcome {
  sceneId: string;
  transition?: string;
  valueChanges?: ValueChange[];
}

// Scene Element Types
export type ElementType = 'narration' | 'dialogue' | 'thought' | 'choice' | 'qte' | 'dialogueTask';

export interface BaseElement {
  id: string;
  type: ElementType;
  // order field removed as requested
}

export interface NarrationElement extends BaseElement {
  type: 'narration';
  text: string;
}

export interface DialogueElement extends BaseElement {
  type: 'dialogue';
  characterId: string;
  text: string;
}

export interface ThoughtElement extends BaseElement {
  type: 'thought';
  characterId: string;
  text: string;
}

export interface ChoiceOption {
  id: string;
  text: string;
  nextSceneId: string;
  valueChanges?: ValueChange[];
}

export interface ChoiceElement extends BaseElement {
  type: 'choice';
  text: string;
  options: ChoiceOption[];
}

export interface QteElement extends BaseElement {
  type: 'qte';
  description: string;
  introText?: string; // Guide text shown before QTE starts
  timeLimit?: number; // Time limit in seconds (3-6)
  keySequence?: string; // Sequence of characters to press (3-6 chars)
  success: ElementOutcome;
  failure: ElementOutcome;
}

export interface DialogueTaskElement extends BaseElement {
  type: 'dialogueTask';
  goal: string;
  targetCharacterId: string;
  background: string;
  openingLine: string;
  success: ElementOutcome;
  failure: ElementOutcome;
}

export type SceneElement = 
  | NarrationElement 
  | DialogueElement 
  | ThoughtElement 
  | ChoiceElement 
  | QteElement 
  | DialogueTaskElement;

// Scene Types
export type SceneType = 'start' | 'normal' | 'ending' | 'bad-ending';

export interface Scene {
  id: string;
  title: string;
  type: SceneType;
  locationId: string;
  elements: SceneElement[];
  nextSceneId?: string; // For linear scenes
  revivalPointId?: string; // For bad-ending scenes that can restart at another point
}

// Complete Story Structure
export interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
  characters: Character[];
  locations: Location[];
  scenes: Scene[];
  globalValues: GlobalValue[]; // New field for global values
}

// Flow Node Types for React Flow
export interface FlowNode {
  id: string;
  type?: string;
  data: {
    label: string;
    sceneType: SceneType;
    locationName?: string;
    elements?: SceneElement[];
  };
  position: {
    x: number;
    y: number;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
  type?: string;
  animated?: boolean;
  style?: React.CSSProperties;
}
