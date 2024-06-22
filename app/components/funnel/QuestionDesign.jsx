import { useFunnelEditContext } from "../../context/FunnelEditContext";
import {TextField} from '@shopify/polaris';
import AddField from './AddField';

export default function QuestionDesign() {
  const { editItem } = useFunnelEditContext();

  if(!editItem) return <div></div>

  return <div className="question-design-comp">
    <fieldset className="__q-fieldset">
      <legend>Question</legend>
      <TextField
        value={ editItem?.question }
        onChange={ value => { } }
        autoComplete="off"
        helpText="Enter your question."
      />
    </fieldset>

    <fieldset className="__q-fieldset">
      <legend>Content</legend>
      <TextField
        value={ editItem?.content }
        onChange={ value => { } }
        autoComplete="off"
        helpText="You can use HTML for this field."
        multiline={ 4 }
      />
    </fieldset>

    { JSON.stringify(editItem) }
    <AddField />
  </div>
}