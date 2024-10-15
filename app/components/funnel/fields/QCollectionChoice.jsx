import { useEffect, useState } from 'react';
import { useAppBridge, } from '@shopify/app-bridge-react';
import { useFunnelEditContext } from '../../../context/FunnelEditContext';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@shopify/polaris';
import { Tag, LegacyStack, Icon, TextField } from '@shopify/polaris';
import {
  ProductAddIcon, ProductFilledIcon, HashtagIcon, DeleteIcon
} from '@shopify/polaris-icons';

export default function QCollectionChoice(props) {
  const shopify = useAppBridge();
  const { fn } = useFunnelEditContext();
  const { onUpdateQuestionField, onDeleteField } = fn;

  const onAddCollection = (selectedCollections) => {
    let __o = [...props?.options];
    selectedCollections.forEach((item, __i_index) => {
      const { id, handle, title, image } = item;
      let found = __o.find(o => o.__c_id === item.id);
      if(found === undefined) {
        __o.push({
          __key: uuidv4(),
          __c_id: id,
          __c_handle: handle,
          __c_title: title,
          __c_image: image,
          label: title, 
          value: handle,
        });
      }
    })

    onUpdateQuestionField(__o, 'field.options');
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

  const onPickCollection = async (ids = []) => {
    let __o = [...props?.options];
    const selected = await shopify.resourcePicker({
      type: 'collection', 
      multiple: true,
      // selectionIds: ids, // __o.map(o => ({ id: o.__c_id })),
    });
    if(!selected) return;

    onAddCollection(selected);
  }

  const ButtonAddCollections = () => {
    const ButtonAddCollectionInit = (
      <Button icon={ ProductAddIcon } onClick={ e => {
        e.preventDefault();
        onPickCollection();
      } }>Select Collections</Button>
    ) 
  
    const ButtonAddMoreCollection = (
      <Button icon={ ProductAddIcon } onClick={ e => {
        e.preventDefault();
        onPickCollection();
      } } >Add More Collection</Button>
    )

    return (props.options.length == 0 ? ButtonAddCollectionInit : ButtonAddMoreCollection)
  }

  return <fieldset className="q-collection-choice __q-fieldset">
    <legend>Collection Config</legend>
    {
      props.options.length > 0 && 
      <table className="bm-table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Slug (value)</th>
            <th>Title (label)</th> 
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            props.options.length > 0 && 
            props.options.map((o, __o_index) => {
              const { __key, __c_id, __c_handle, __c_title, label } = o;
              return <tr key={ __key }> 
                <td className="bm__text-center">
                  <span className="bm__order-number">{ __o_index + 1 }</span>
                </td>
                <td>
                  <Tag>
                    <LegacyStack spacing="extraTight">
                      <Icon source={ HashtagIcon } />
                      <span>{ __c_id.replace('gid://shopify/Collection/', '') }</span>
                    </LegacyStack>
                  </Tag>
                </td>
                <td>
                  <Tag>
                    <LegacyStack spacing="extraTight">
                      <Icon source={ ProductFilledIcon } />
                      <span>{ __c_handle }</span>
                    </LegacyStack>
                  </Tag>
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
      </table>
    }

    { ButtonAddCollections() }

    <div style={ {height: '2em'} }></div>

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