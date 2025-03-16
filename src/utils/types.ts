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
  // Add missing properties
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
  voice?: string; // 新增的角色音色属性
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
  // New fields
  entranceEffect?: string;
  environmentEffect?: string;
  endingName?: string;
  explorationItems?: ExplorationItem[];
  backgroundMusic?: {
    id: string;
    name: string;
    url: string;
  };
  unlockPrice?: number; // 新增场景解锁价格字段
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
  // Add common properties used by specific element types
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
  // 新增解锁条件相关字段
  locked?: boolean;
  unlockPrice?: number; // 钻石解锁价格
  unlockConditions?: UnlockCondition[]; // 基于全局变量的解锁条件
}

// 新增解锁条件类型
export interface UnlockCondition {
  valueId: string;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte'; // greater than, less than, equal, greater than or equal, less than or equal
  targetValue: number;
}

export interface QteElement extends SceneElement {
  type: 'qte';
  description: string;
  qteType: 'action' | 'combo' | 'unlock'; // QTE type
  keySequence?: string | string[]; // Updated to support both string and string[] for backward compatibility
  directionSequence?: string; // For combo type, e.g. "UDLR" (Up, Down, Left, Right)
  unlockPattern?: 'C' | 'L' | 'M' | 'N' | 'O' | 'S' | 'U' | 'Z'; // For unlock type
  timeLimit: number;
  introText?: string;
  success: ElementOutcome;
  failure: ElementOutcome;
  isDoubleChar?: boolean; // This will be kept for backward compatibility
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
  characterIntro?: string; // 新增角色介绍属性
  dialogueTopics?: string[]; // 新增对话话题属性
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
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte'; // greater than, less than, equal, greater than or equal, less than or equal
  targetValue: number;
}
