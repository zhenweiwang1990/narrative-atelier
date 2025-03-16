
import { MarkerType } from 'reactflow';

// Edge settings for the graph
export const edgeOptions = {
  type: 'smoothstep',
  animated: false,
  style: { stroke: '#888' },
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

// Edge settings for revival points
export const revivalEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  style: { stroke: '#d32f2f', strokeWidth: 2, strokeDasharray: '5,5' },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: '#d32f2f',
  },
};
