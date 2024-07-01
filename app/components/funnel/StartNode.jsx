import { useCallback, Fragment } from 'react';
import { useFunnelEditContext } from '../../context/FunnelEditContext';
import { QuestionCircleIcon, HomeFilledIcon } from '@shopify/polaris-icons';
import { Handle, Position, NodeToolbar } from 'reactflow';
import { Text, Icon } from '@shopify/polaris';

export default function StartNode({ data, isConnectable }) {
  return <div className="flow-node node-type__start">
    <Text variant="headingXs" as="h6">
      <label><Icon source={ HomeFilledIcon } /> { data.label }</label>
    </Text>
    <Handle type="source" position={ Position.Right } isConnectable={ isConnectable } />
  </div>
}