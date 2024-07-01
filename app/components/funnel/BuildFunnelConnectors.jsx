import { useCallback } from 'react';
import { useFunnelEditContext } from '../../context/FunnelEditContext';
import FlowToolEdit from './FlowToolsEdit';
import StartNode from './StartNode';
import QuestionNode from './QuestionNode';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';


const nodeTypes = { StartNode, QuestionNode };

const FunnelFlow = () => {
  const { flowDesign } = useFunnelEditContext();
  const {
    nodes, setNodes, onNodesChange,
    edges, setEdges, onEdgesChange
  } = flowDesign;

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return <div className="funnel-flow-comp">
    { console.log(edges) }
    <FlowToolEdit />
    {/* { JSON.stringify(edges) } */}
    <div style={{ 
      width: '100%', 
      height: '500px', 
      background: '#FAFAFA', 
      borderRadius: '6px', 
      border: 'solid 1px #ddd' }}> 
      <ReactFlow 
        nodes={ nodes } 
        edges={ edges } 
        onNodesChange={ onNodesChange }
        onEdgesChange={ onEdgesChange }
        onConnect={ onConnect }
        nodeTypes={ nodeTypes }
      >
        <Controls />
        {/* <MiniMap /> */}
        <Background variant="dots" gap={ 12 } size={ 1 } />
      </ReactFlow>
    </div>
  </div>
}

export default function BuildFunnelConnectors() {

  return <ReactFlowProvider>
    <FunnelFlow />
  </ReactFlowProvider>
}