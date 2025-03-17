
import { SceneElement } from './elements';
import { ExplorationItem } from './location';

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
