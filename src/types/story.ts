
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

// Import necessary types from other files
import { Character } from './character';
import { Location } from './location';
import { Scene } from './scene';
import { GlobalValue } from './values';
