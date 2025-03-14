
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

// Scene Element Types
export type ElementType = 'narration' | 'dialogue' | 'thought' | 'choice' | 'qte' | 'dialogueTask';

export interface BaseElement {
  id: string;
  type: ElementType;
  order: number;
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
}

export interface ChoiceElement extends BaseElement {
  type: 'choice';
  text: string;
  options: ChoiceOption[];
}

export interface QteElement extends BaseElement {
  type: 'qte';
  description: string;
  successSceneId: string;
  failureSceneId: string;
}

export interface DialogueTaskElement extends BaseElement {
  type: 'dialogueTask';
  goal: string;
  targetCharacterId: string;
  background: string;
  openingLine: string;
  successSceneId: string;
  failureSceneId: string;
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
