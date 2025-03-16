
import { useCallback } from 'react';
import { Node } from 'reactflow';
import { SceneFilterOption } from '../types/flowTypes';
import { SceneNodeData } from '../flowTypes';

export const useNodeFiltering = (nodes: Node<SceneNodeData>[], filterOption: SceneFilterOption) => {
  // Filter nodes based on the selected filter option
  const getFilteredNodes = useCallback(() => {
    if (filterOption === 'all') {
      return nodes;
    }
    
    return nodes.filter(node => {
      if (filterOption === 'endings') {
        return node.data.sceneType === 'ending' || node.data.sceneType === 'bad-ending';
      } else if (filterOption === 'incomplete') {
        return node.data.sceneType === 'normal' && !node.data.hasNextScene;
      }
      return true;
    });
  }, [nodes, filterOption]);

  return { getFilteredNodes };
};
