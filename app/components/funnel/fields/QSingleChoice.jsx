import { TextField, Checkbox, Text, Button } from '@shopify/polaris';
import { useFunnelEditContext } from '../../../context/FunnelEditContext';
import OptionsRepeater from './OptionsRepeater';

const QSingleChoicePreview = (config) => {
  return <div>...</div>
}

export default function QSingleChoice(props) {
  const { fn } = useFunnelEditContext();
  const { onUpdateQuestionField, onDeleteField } = fn;

  return <fieldset className="q-single-choice __q-fieldset">
    <legend>Single Choice Config</legend>
    { JSON.stringify(props) }
    <fieldset className="__q-fieldset">
      <legend>Preview</legend>
      <QSingleChoicePreview />
    </fieldset>

    <fieldset className="__q-fieldset">
      <legend>Configs</legend>

      <div className="__q-field-config-container">

        <OptionsRepeater options={ props?.options } />

        <TextField
          label="Help Text"
          value={ props?.help_text }
          onChange={ value => { onUpdateQuestionField(value, 'field.help_text') } }
          autoComplete="off"
        />

        <Checkbox
          label="required"
          checked={ props?.required }
          onChange={ newChecked => { onUpdateQuestionField(newChecked, 'field.required') } }
        />
      </div>

    </fieldset>

    <fieldset className="__q-fieldset">
      <legend>Actions</legend>
      <div>
        <Button variant="primary" tone="critical" onClick={ e => {
          e.preventDefault();
          let r = confirm('Are you sure you want to delete this?');

          if(r) {
            onDeleteField()
          }
        } }>Delete Field</Button>
      </div>
    </fieldset>
  </fieldset>
} 