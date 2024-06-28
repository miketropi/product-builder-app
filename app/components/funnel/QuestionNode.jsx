import { useCallback, Fragment } from 'react';
import { useFunnelEditContext } from '../../context/FunnelEditContext';
import { Text, Icon } from '@shopify/polaris';
import { QuestionCircleIcon } from '@shopify/polaris-icons';
import { Handle, Position, NodeToolbar } from 'reactflow';


const QuestionNodeHandle = ({ handleData, isConnectable }) => {
  if(!handleData) return <></>
  
  const { type, options } = handleData;

  return <>
    {
      (() => {
        switch(type) {
          case 'QSingleChoice':
            return <div>
              {
                options.map((o, __o_index) => {
                  const { __key, label, value } = o;
                  return <div key={ __key }>
                    { label }
                    <Handle 
                      type="source" 
                      position={Position.Right} 
                      style={ { top: 10 * (__o_index + 1) } }
                      id={ value } 
                      isConnectable={ isConnectable } />
                  </div>
                })
              }
            </div>
            break;
        }
      })()
    }
  </>
}

export default function QuestionNode({ data, isConnectable }) {
  const { questions } = useFunnelEditContext();
  const { question_key } = data;
  return <div className="flow-node node-type__question">
    { ((q) => {

      if(!q) {
        return <div>not available!</div>
      }

      const { question, field } = q;

      return <>
        {/* <NodeToolbar>
          <button>delete</button>
          <button>copy</button>
          <button>expand</button>
        </NodeToolbar> */}
        <div className="flow-node__heading">
          <Handle type="target" position={Position.Left} isConnectable={ isConnectable } />
          <Text variant="headingXs" as="h6">
            { question }
          </Text>
        </div>
        <div className="flow-node__entry">
          {/* { JSON.stringify(field) } */}
          <QuestionNodeHandle handleData={ field } isConnectable={ isConnectable } />
        </div>
      </>
    })(questions.find(q => q.__key == question_key)) }
  </div>
}