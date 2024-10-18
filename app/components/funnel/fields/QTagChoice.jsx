import { useEffect, useState } from 'react';
import { useAppBridge, } from '@shopify/app-bridge-react';
import { useFunnelEditContext } from '../../../context/FunnelEditContext';
import { Button } from '@shopify/polaris';
import { v4 as uuidv4 } from 'uuid';
import { TextField } from '@shopify/polaris';
import {
  ProductAddIcon, DeleteIcon
} from '@shopify/polaris-icons';

export default function QTagChoice(props) {
  const shopify = useAppBridge();
  const { fn } = useFunnelEditContext();
  const { onUpdateQuestionField, onDeleteField } = fn;

  const onAddTagItem = () => {
    let __o = [...props?.options, {
      __key: uuidv4(),
      label: `Tag ${ props.options.length + 1 }`, 
      value: `tag-${ props.options.length + 1 }`,
    }];

    onUpdateQuestionField(__o, 'field.options');
  }

  const ButtonAddTagItem = () => {
    return <Button icon={ ProductAddIcon } onClick={ onAddTagItem }>Add Item</Button>
  }

  const onChangeOptionField = (value, fieldName, __index) => {
    let __options = (props?.options ? [...props?.options] : []);
    __options[__index][fieldName] = value;
    onUpdateQuestionField(__options, `field.options`)
  }

  const onDeleteOptionItem = (index) => {
    let r = confirm('Are you sure you want to delete this option?');
    if(!r) return;

    let __options = (props?.options ? [...props?.options] : []);
    __options.splice(index, 1);
    onUpdateQuestionField(__options, 'field.options');
  }

  return <fieldset className="q-tag-choice __q-fieldset">
    <legend>Tag Config</legend>

    {/* <fieldset className="__q-fieldset">
      <legend>Tag Name</legend>
      <TextField
        value={ props?.tag_name }
        onChange={ value => {
          onUpdateQuestionField(value, `field.tag_name`)
        } }
        autoComplete="off"
      />
    </fieldset> */}

    <fieldset className="__q-fieldset">
      <legend>Tag Options</legend>

      <table className="bm-table">
        <thead>
          <tr>
            <th></th>
            <th>Value</th>
            <th>Label</th> 
            <th></th>
          </tr>
        </thead>

        {
          props.options.length > 0 && 
          <tbody>
            {
              props.options.length > 0 && 
              props.options.map((o, __o_index) => {
                const { __key, value, label } = o;
                return <tr>
                  <td className="bm__text-center">
                    <span className="bm__order-number">{ __o_index + 1 }</span>
                  </td>
                  <td>
                    <TextField
                      value={ value }
                      onChange={ value => {
                        onChangeOptionField(value, 'value', __o_index);
                      } }
                      autoComplete="off"
                    />
                  </td>
                  <td>
                    <TextField
                      value={ label }
                      onChange={ value => {
                        onChangeOptionField(value, 'label', __o_index);
                      } }
                      autoComplete="off"
                    />
                  </td>
                  <td>
                  <Button icon={ DeleteIcon } accessibilityLabel="remove item" onClick={ e => onDeleteOptionItem(__o_index) } />
                  </td>
                </tr>
              })
            }
          </tbody>
        }
      </table>

      { ButtonAddTagItem() }
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