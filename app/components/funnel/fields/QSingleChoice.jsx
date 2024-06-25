import { TextField, Checkbox, Text, Button, Autocomplete } from '@shopify/polaris';
import { useFunnelEditContext } from '../../../context/FunnelEditContext';
import OptionsRepeater from './OptionsRepeater';
import { v4 as uuidv4 } from 'uuid';

const QSingleChoicePreview = (config) => {
  return <div>...</div>
}

export default function QSingleChoice(props) {
  const { fn } = useFunnelEditContext();
  const { onUpdateQuestionField, onDeleteField } = fn;

  const onAddOptionItem = () => {
    let __nextIndex = props.options.length + 1;
    onUpdateQuestionField([
      ...props?.options,
      { __key: uuidv4(), label: `Option ${ __nextIndex }`, value: `option_${ __nextIndex }` },
    ], 'field.options')
  }

  const onDeleteOptionItem = (index) => {
    let r = confirm('Are you sure you want to delete this option?');
    if(!r) return;

    let __options = (props?.options ? [...props?.options] : []);
    __options.splice(index, 1);
    onUpdateQuestionField(__options, 'field.options');
  }

  const onOrderOptionItem = (newIndex, oldIndex) => {
    let __options = (props?.options ? [...props?.options] : []);
    const [removed] = __options.splice(oldIndex, 1);
    __options.splice(newIndex, 0, removed);

    onUpdateQuestionField(__options, 'field.options');
  }

  const textField = (
    <Autocomplete.TextField
      onChange={ value => { onUpdateQuestionField(value, 'field.value') } }
      label="Default Value"
      value={ props?.value }
      autoComplete="off"
    />
  );

  return <fieldset className="q-single-choice __q-fieldset">
    <legend>Single Choice Config</legend>
    {/* { JSON.stringify(props) } */}
    <fieldset className="__q-fieldset">
      <legend>Preview</legend>
      <QSingleChoicePreview />
    </fieldset>

    <fieldset className="__q-fieldset">
      <legend>Configs</legend>

      <div className="__q-field-config-container">

        <OptionsRepeater 
          label="Options" 
          options={ props?.options } 
          onChange={ (value, fieldName, __index) => {
            onUpdateQuestionField(value, `field.options[${ __index }].${ fieldName }`)
          } } 
          onDelete={ __index => { onDeleteOptionItem(__index) } }
          onAdd={ () => { onAddOptionItem() } }
          onOrder={ onOrderOptionItem }
        />

        {/* <TextField
          label="Default Value"
          value={ props?.value }
          onChange={ value => { onUpdateQuestionField(value, 'field.value') } }
          autoComplete="off"
        /> */}

        <Autocomplete
          options={ props?.options }
          selected={ [props?.value] }
          onSelect={ value => { onUpdateQuestionField(value[0], 'field.value') } }
          textField={textField}
        />

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