export type StoryType = 'interactive' | 'linear' | 'branching';

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
  coverPhoto?: string; // 添加封面照片字段
}

export interface Scene {
  id: string;
  name: string;
  type: 'normal' | 'branching' | 'ending' | 'bad-ending' | 'convergence';
  elements: SceneElement[];
  position: { x: number; y: number };
  description?: string;
  convergenceTarget?: string;
}

export interface SceneElement {
  id: string;
  type: 'narration' | 'dialogue' | 'thought' | 'choice' | 'qte' | 'dialogueTask';
  text?: string;
  characterId?: string;
  options?: ChoiceOption[];
  description?: string;
  timeLimit?: number;
  keySequence?: string;
  successTarget?: string;
  failureTarget?: string;
  goal?: string;
  openingLine?: string;
  successTargetScene?: string;
  failureTargetScene?: string;
}

export interface ChoiceOption {
  id: string;
  text: string;
  target: string;
  outcome?: 'success' | 'failure';
  sceneTarget?: string;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export interface GlobalValue {
  id: string;
  name: string;
  type: 'number' | 'boolean' | 'text';
  initialValue: any;
}
