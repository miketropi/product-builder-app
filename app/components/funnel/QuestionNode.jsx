import { useCallback, Fragment, useRef, useState, useEffect } from 'react';
import { useFunnelEditContext } from '../../context/FunnelEditContext';
import { Text, Icon, Badge } from '@shopify/polaris';
import { QuestionCircleIcon, AlertCircleIcon } from '@shopify/polaris-icons';
import { Handle, Position, NodeToolbar } from 'reactflow';

const OptionNode = (props) => {
  const { option, __index, isConnectable } = props;
  const { __key, label, value } = option;

  return <li className="choice-item">
    <div className="__entry">
      <span className="__number">{ __index + 1 }</span> 
      <span title={ label }>{ label }</span>
    </div>
    <Handle 
      type="source" 
      position={Position.Right}  
      style={ { position: 'absolute', top: `49%`, right: `-12px` } }
      id={ value } 
      isConnectable={ isConnectable } />
  </li>
}

const QuestionNodeHandle = ({ handleData, isConnectable }) => {
  if(!handleData) return (
    <>
      <div className="__node-text">
        <Icon tone="critical" source={ AlertCircleIcon } /> Not yet select field type!
      </div>
    </>
  )
  
  const { type, options } = handleData;

  return <>
    {
      (() => {
        switch(type) {
          case 'QSingleChoice':
            return <>
              <Badge tone="attention">Single Select</Badge>
              <div style={{ marginBottom: `.5em` }}></div>
              <ul className="choice-list">
                {
                  options.map((o, __o_index) => {
                    const { __key, label, value } = o;

                    return <OptionNode 
                      key={ __key } 
                      option={ o } 
                      __index={ __o_index } 
                      isConnectable={ isConnectable } />
                  })
                }
              </ul>
            </>
            break;

          case 'QMultipleChoice':
            return <>
              <Badge tone="attention">Multiple Select</Badge>
              <div>
                <Handle 
                  type="source" 
                  position={Position.Right}  
                  // style={ { position: 'absolute', top: `49%`, right: `-12px` } }
                  id={ '__NEXT_STEP__' } 
                  isConnectable={ isConnectable } />
              </div>
            </>
            break;

          case 'QTextField': 
            return <>
              <Badge tone="attention">Input Text</Badge>
              <div>
                <Handle 
                  type="source" 
                  position={Position.Right}  
                  // style={ { position: 'absolute', top: `49%`, right: `-12px` } }
                  id={ '__NEXT_STEP__' } 
                  isConnectable={ isConnectable } />
              </div>
            </>
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
          <Handle 
            type="target" 
            position={Position.Left} 
            style={ { top: 30 } }
            isConnectable={ isConnectable } />
          <Text variant="headingXs" as="h6">
            <span title={ question }>
              { question }
            </span>
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