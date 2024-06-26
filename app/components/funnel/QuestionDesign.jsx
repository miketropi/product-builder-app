import { useFunnelEditContext } from "../../context/FunnelEditContext";
import { TextField, Button } from '@shopify/polaris';
import AddField from './AddField';
import DynamicComponent from '../DynamicComponent';
import { DeleteIcon } from '@shopify/polaris-icons';

export default function QuestionDesign() {
  const { editItem, fn } = useFunnelEditContext();
  const { onUpdateQuestionField, onDeleteQuestion } = fn;

  if(!editItem) return <div></div>

  return <div className="question-design-comp">
    <div className="question-design-comp__heading">
      <span>{ editItem.__key }</span>
      <Button icon={ DeleteIcon } onClick={ e => {
        let c = confirm('Are you sure you want to delete this question?');
        if(!c) return;

        onDeleteQuestion(editItem.__key)
      } } >Delete Question</Button>
    </div>

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