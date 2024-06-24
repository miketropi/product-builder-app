import { useFunnelEditContext } from "../../context/FunnelEditContext";
import {TextField} from '@shopify/polaris';
import AddField from './AddField';
import DynamicComponent from '../DynamicComponent';

export default function QuestionDesign() {
  const { editItem, fn } = useFunnelEditContext();
  const { onUpdateQuestionField } = fn;

  if(!editItem) return <div></div>

  return <div className="question-design-comp">
    <fieldset className="__q-fieldset">
      <legend>Question</legend>
      <TextField
        value={ editItem?.question }
        onChange={ value => { onUpdateQuestionField(value, 'question') } }
        autoComplete="off"
        helpText="Enter your question."
      />
    </fieldset>

    <fieldset className="__q-fieldset">
      <legend>Content</legend>
      <TextField
        value={ editItem?.content }
        onChange={ value => { onUpdateQuestionField(value, 'content') } }
        autoComplete="off"
        helpText="You can use HTML for this field."
        multiline={ 4 }
      />
    </fieldset>

    {/* { JSON.stringify(editItem) }  */}
    {
      editItem?.field 
        ? <DynamicComponent c={ editItem.field?.type } { ...editItem.field }  /> 
        : <AddField />
    }
  </div>
}