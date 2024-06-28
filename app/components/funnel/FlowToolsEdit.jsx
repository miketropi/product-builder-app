import { useFunnelEditContext } from '../../context/FunnelEditContext';
import SelectQuestionModal from './SelectQuestionModal';

export default function FlowToolEdit () {
  const { questions, flowDesign } = useFunnelEditContext();
  const { onAddQuestion__Flow } = flowDesign;

  return <fieldset className="flow-tool-edit-comp">
    <legend>Toolbar</legend>
    <div>
      <SelectQuestionModal onSelect={ id => { onAddQuestion__Flow(id) } } />
    </div>
  </fieldset>
}