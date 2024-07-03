import { ButtonGroup } from '@shopify/polaris'
import { useFunnelEditContext } from '../../context/FunnelEditContext';
import SelectQuestionModal from './SelectQuestionModal';
import ButtonAddRedirectNode from './ButtonAddRedirectNode';

export default function FlowToolEdit () {
  const { questions, flowDesign } = useFunnelEditContext();
  const { onAddQuestion__Flow, onAddRedirectNode_Flow } = flowDesign; 

  return <fieldset className="flow-tool-edit-comp">
    <legend>Toolbar</legend>
    <div>
      <ButtonGroup>
        <SelectQuestionModal onSelect={ id => { onAddQuestion__Flow(id) } } />
        <ButtonAddRedirectNode onClick={ onAddRedirectNode_Flow } />
      </ButtonGroup>
    </div>
  </fieldset>
}