import { useState } from 'react';
import { TextField, Checkbox, Text, Button, Autocomplete, LegacyStack, Tag } from '@shopify/polaris';
import { useFunnelEditContext } from '../../../context/FunnelEditContext';
import OptionsRepeater from './OptionsRepeater';
import { v4 as uuidv4 } from 'uuid';

const QMultipleChoicePreview = (config) => {
  return <div>...</div>
}

export default function QMultipleChoice(props) {
  const [ filterOptionText, setFilterOptionText ] = useState('');
  const { fn } = useFunnelEditContext();
  const { onUpdateQuestionField, onDeleteField } = fn;

  const onChangeOptionField = (value, fieldName, __index) => {
    let __options = (props?.options ? [...props?.options] : []);
    __options[__index][fieldName] = value;
    onUpdateQuestionField(__options, `field.options`)
  }

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

  const onRemoveTag = (o) => {
    const __value = [...props.value];
    __value.splice(__value.indexOf(o), 1);
    onUpdateQuestionField(__value, 'field.value');
  }

  const verticalContentMarkup =
    props?.value.length > 0 ? (
      <LegacyStack spacing="extraTight" alignment="center">
        { props?.value.map((option) => {
          return (
            <Tag key={`option${option}`} onRemove={ o => { onRemoveTag(o) } }>
              { option }
            </Tag>
          );
        }) }
      </LegacyStack>
    ) : null;

  const textField = (
    <Autocomplete.TextField
      onChange={ value => { setFilterOptionText(value) } }
      label="Default Value"
      value={ filterOptionText }
      placeholder="..."
      verticalContent={ verticalContentMarkup }
      autoComplete="off"
    />
  );

  return <fieldset className="q-single-choice __q-fieldset">
    <legend>Multiple Choice Config</legend>
    {/* { JSON.stringify(props) } */}
    <fieldset className="__q-fieldset">
      <legend>Preview</legend>
      <QMultipleChoicePreview />
    </fieldset>

    <fieldset className="__q-fieldset">
      <legend>Configs</legend>

      <div className="__q-field-config-container">

        <OptionsRepeater 
          label="Options" 
          options={ props?.options } 
          onChange={ onChangeOptionField } 
          onDelete={ onDeleteOptionItem }
          onAdd={ onAddOptionItem }
          onOrder={ onOrderOptionItem }
        />

        <Autocomplete
          allowMultiple
          options={ props?.options.filter(o => (o.value.search(filterOptionText) != -1) ) }
          selected={ props?.value ?? [] }
          textField={ textField }
          onSelect={ value => { 
            console.log(value)
            onUpdateQuestionField(value, 'field.value');
            setFilterOptionText('');
          } }
          listTitle="Suggested Options"
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