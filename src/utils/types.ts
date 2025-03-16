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
  titles?: Title[];
  chapters?: Chapter[];
  coverPhoto?: string;
  protagonistName?: string;
  protagonistGender?: string;
  orientation?: 'hetero' | 'yuri' | 'yaoi' | 'none';
  tags?: string[];
  uiStyle?: 'traditional' | 'scifi' | 'romance' | 'modern' | 'fantasy';
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

export type CharacterGender = 'male' | 'female' | 'other';
export type CharacterRole = 'protagonist' | 'supporting';

export interface Character {
  id: string;
  name: string;
  gender: CharacterGender;
  role: CharacterRole;
  bio: string;
  profilePicture?: string;
  fullBody?: string;
  voice?: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  scenes: string[];
  background?: string;
}

export type SceneType = 'normal' | 'start' | 'bad-ending' | 'ending';

export interface Scene {
  id: string;
  title: string;
  type: SceneType;
  locationId: string;
  elements: SceneElement[];
  nextSceneId?: string;
  revivalPointId?: string;
  position: { x: number; y: number };
  entranceEffect?: string;
  environmentEffect?: string;
  endingName?: string;
  endingPoster?: string;
  explorationItems?: ExplorationItem[];
  backgroundMusic?: {
    id: string;
    name: string;
    url: string;
  };
  unlockPrice?: number;
}

export interface ExplorationItem {
  id: string;
  type: 'item' | 'knowledge';
  name: string;
  description: string;
  isCollectible?: boolean;
}

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

export interface UnlockCondition {
  valueId: string;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  targetValue: number;
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

export interface GlobalValue {
  id: string;
  name: string;
  description: string;
  initialValue: number;
  currentValue?: number;
  type?: string;
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
  background?: string;
  characterIntro?: string;
  dialogueTopics?: string[];
  success: ElementOutcome;
  failure: ElementOutcome;
}

export interface Title {
  id: string;
  name: string;
  description?: string;
  conditions: TitleCondition[];
}

export interface TitleCondition {
  valueId: string;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  targetValue: number;
}
