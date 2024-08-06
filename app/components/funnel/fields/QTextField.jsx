import { TextField, Checkbox, Text, Button } from '@shopify/polaris';
import { useFunnelEditContext } from '../../../context/FunnelEditContext';

const QTextFieldPreview = (config) => {
  return <div>...</div>
}

export default function QTextField(config) {
  const { fn } = useFunnelEditContext();
  const { onUpdateQuestionField, onDeleteField } = fn;

  return <fieldset className="q-text-field __q-fieldset">
    <legend>Text Field Configs</legend>

    <fieldset className="__q-fieldset"> 
      <legend>Preview</legend>
      <QTextFieldPreview />
    </fieldset>

    <fieldset className="__q-fieldset">
      <legend>Configs</legend> 
      <div className="__q-field-config-container">
        {/* { JSON.stringify(config) } */}
        <TextField
          label="Default Value"
          value={ config?.value }
          onChange={ value => { onUpdateQuestionField(value, 'field.value') } }
          autoComplete="off"
        />
        
        <TextField
          label="Placeholder"
          value={ config?.placeholder }
          onChange={ value => { onUpdateQuestionField(value, 'field.placeholder') } } 
          autoComplete="off"
        />

        <TextField
          label="Help Text"
          value={ config?.help_text }
          onChange={ value => { onUpdateQuestionField(value, 'field.help_text') } }
          autoComplete="off"
        />

        <Checkbox
          label="required"
          checked={ config?.required }
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