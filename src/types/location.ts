
export interface Location {
  id: string;
  name: string;
  description: string;
  scenes: string[];
  background?: string;
}

export interface ExplorationItem {
  id: string;
  type: 'item' | 'knowledge';
  name: string;
  description: string;
  isCollectible?: boolean;
}
