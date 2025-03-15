
import { Node, Edge, MarkerType } from 'reactflow';
import { Story, Scene } from '@/utils/types';
import { SceneNodeData } from './flowTypes';

// Transform story scenes to flow nodes
export const scenesToNodes = (story: Story): Node[] => {
  return story.scenes.map((scene, index) => {
    const location = story.locations.find(loc => loc.id === scene.locationId);
    
    // Determine if this scene has any next scene connections
    const hasNextScene = 
      scene.nextSceneId !== undefined && scene.nextSceneId !== "" || 
      scene.type === "ending" ||
      scene.type === "bad-ending" ||
      scene.elements.some(element => {
        if (element.type === "choice") {
          return element.options.some(option => option.nextSceneId);
        }
        if (element.type === "qte") {
          return element.successSceneId || element.failureSceneId;
        }
        if (element.type === "dialogueTask") {
          return element.successSceneId || element.failureSceneId;
        }
        return false;
      });
    
    return {
      id: scene.id,
      type: 'scene',
      data: {
        label: scene.title,
        sceneType: scene.type,
        locationName: location?.name || 'Unknown Location',
        elements: scene.elements,
        revivalPointId: scene.revivalPointId,
        nextSceneId: scene.nextSceneId,
        hasNextScene: hasNextScene
      } as SceneNodeData,
      position: {
        x: (index % 3) * 250,
        y: Math.floor(index / 3) * 180
      }
    } as Node;
  });
};

// Create edges from scene connections
export const createEdgesFromStory = (story: Story): Edge[] => {
  const flowEdges: Edge[] = [];
  
  // Linear connections from nextSceneId
  story.scenes.forEach(scene => {
    if (scene.nextSceneId) {
      flowEdges.push({
        id: `e-${scene.id}-${scene.nextSceneId}`,
        source: scene.id,
        target: scene.nextSceneId,
        type: 'smoothstep',
        animated: false,
        label: 'Next',
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      });
    }
    
    // Add revival point connections with red dashed line
    if (scene.type === 'bad-ending' && scene.revivalPointId) {
      flowEdges.push({
        id: `e-revival-${scene.id}-${scene.revivalPointId}`,
        source: scene.id,
        target: scene.revivalPointId,
        type: 'smoothstep',
        animated: true,
        label: 'Revival',
        style: { 
          stroke: '#ef4444', 
          strokeDasharray: '5,5',
          strokeWidth: 2
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#ef4444'
        }
      });
    }
  });

  // Connections from choice elements
  story.scenes.forEach(scene => {
    scene.elements.forEach((element, elemIndex) => {
      if (element.type === 'choice') {
        element.options.forEach((option, optIndex) => {
          if (option.nextSceneId) {
            flowEdges.push({
              id: `e-${scene.id}-${option.nextSceneId}-choice-${optIndex}`,
              source: scene.id,
              target: option.nextSceneId,
              sourceHandle: `choice-${elemIndex}-${optIndex}`,
              label: `Choice: ${option.text.substring(0, 15)}${option.text.length > 15 ? '...' : ''}`,
              type: 'smoothstep',
              animated: true,
              style: { stroke: '#f59e0b' }
            });
          }
        });
      } else if (element.type === 'qte') {
        if (element.successSceneId) {
          flowEdges.push({
            id: `e-${scene.id}-${element.successSceneId}-qte-success-${elemIndex}`,
            source: scene.id,
            sourceHandle: `qte-success-${elemIndex}`,
            target: element.successSceneId,
            label: 'Success',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#10b981' }
          });
        }
        
        if (element.failureSceneId) {
          flowEdges.push({
            id: `e-${scene.id}-${element.failureSceneId}-qte-failure-${elemIndex}`,
            source: scene.id,
            sourceHandle: `qte-failure-${elemIndex}`,
            target: element.failureSceneId,
            label: 'Failure',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#ef4444' }
          });
        }
      } else if (element.type === 'dialogueTask') {
        if (element.successSceneId) {
          flowEdges.push({
            id: `e-${scene.id}-${element.successSceneId}-dialogueTask-success-${elemIndex}`,
            source: scene.id,
            sourceHandle: `dialogueTask-success-${elemIndex}`,
            target: element.successSceneId,
            label: 'Success',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#10b981' }
          });
        }
        
        if (element.failureSceneId) {
          flowEdges.push({
            id: `e-${scene.id}-${element.failureSceneId}-dialogueTask-failure-${elemIndex}`,
            source: scene.id,
            sourceHandle: `dialogueTask-failure-${elemIndex}`,
            target: element.failureSceneId,
            label: 'Failure',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#ef4444' }
          });
        }
      }
    });
  });

  return flowEdges;
};
