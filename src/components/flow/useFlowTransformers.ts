
import { useMemo, useState, useCallback } from 'react';
import { useEdges, useNodes, Node, Edge, Connection, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { Scene, SceneType } from '@/utils/types';

interface FlowTransformers {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  transformScenesToNodes: () => Node[];
  transformScenesToEdges: () => Edge[];
  getNodesAndEdges: () => { nodes: Node[]; edges: Edge[] };
}

export function useFlowTransformers(scenes: Scene[]): FlowTransformers {
  // Set up state for nodes and edges
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Transform scenes into nodes (scene cards)
  const transformScenesToNodes = useCallback(() => {
    if (!scenes) return [];
    
    return scenes.map((scene) => {
      // Find the location
      const hasNextScene = !!scene.nextSceneId;
      
      // For bad-ending scenes, get the revival point name
      let revivalPointName;
      if (scene.type === 'bad-ending' && scene.revivalPointId) {
        const revivalPoint = scenes.find(s => s.id === scene.revivalPointId);
        revivalPointName = revivalPoint?.title || '';
      }
      
      return {
        id: scene.id,
        type: 'sceneNode',
        position: scene.position || { x: 0, y: 0 },
        data: {
          label: scene.title,
          sceneType: scene.type,
          locationName: scene.locationId ? scenes.find(s => s.id === scene.locationId)?.title || '' : '',
          elements: scene.elements,
          revivalPointId: scene.revivalPointId,
          revivalPointName: revivalPointName,
          nextSceneId: scene.nextSceneId,
          hasNextScene,
        },
      };
    });
  }, [scenes]);

  // Transform scenes into edges (arrows)
  const transformScenesToEdges = useCallback(() => {
    if (!scenes) return [];
    
    return scenes.reduce((edges: Edge[], scene) => {
      if (scene.nextSceneId) {
        edges.push({
          id: `edge-${scene.id}-${scene.nextSceneId}`,
          source: scene.id,
          target: scene.nextSceneId,
          type: 'smoothstep',
          animated: true,
        });
      }
      
      // Add revival point edges
      if (scene.type === 'bad-ending' && scene.revivalPointId) {
        edges.push({
          id: `revival-edge-${scene.id}-${scene.revivalPointId}`,
          source: scene.id,
          target: scene.revivalPointId,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#d32f2f', strokeWidth: 2, strokeDasharray: '5,5' },
        });
      }
      
      return edges;
    }, []);
  }, [scenes]);

  const getNodesAndEdges = useCallback(() => {
    const nodes = transformScenesToNodes();
    const edges = transformScenesToEdges();
    return { nodes, edges };
  }, [transformScenesToNodes, transformScenesToEdges]);

  // Initialize nodes and edges when scenes change
  useMemo(() => {
    const { nodes: newNodes, edges: newEdges } = getNodesAndEdges();
    setNodes(newNodes);
    setEdges(newEdges);
  }, [scenes, getNodesAndEdges]);

  // Node changes handler
  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  // Edge changes handler
  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  // Connection handler
  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => [...eds, {
      ...connection,
      id: `edge-${connection.source}-${connection.target}`,
      type: 'smoothstep',
      animated: true,
    }]);
  }, []);

  // Node click handler
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  return {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    setNodes,
    setEdges,
    transformScenesToNodes,
    transformScenesToEdges,
    getNodesAndEdges,
  };
}
