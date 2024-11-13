import { useEffect, useState } from 'react';
import { useAppBridge, } from '@shopify/app-bridge-react';
import { useFunnelEditContext } from '../../../context/FunnelEditContext';
import { Button } from '@shopify/polaris';
import { v4 as uuidv4 } from 'uuid';
import { TextField, ChoiceList, Thumbnail, Popover } from '@shopify/polaris';
// import PbSelectImage from '../../PbSelectImage';
import SelectMedia from '../../GlobalCom/SelectMedia';

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
      <legend>Options Style</legend>
      <ChoiceList
        choices={[
          { label: 'No image', value: 'no-image' },

          { label: '2 cols - Square 472x472', value: '2-cols-square-472_472' },
          { label: '2 cols - Portrait 472x630', value: '2-cols-portrait-472_630' },
          { label: '2 cols - Landscape 472x314', value: '2-cols-landscape-472_314' },

          { label: '3 cols - Square 309x309', value: '3-cols-square-309_309' },
          { label: '3 cols - Portrait 309x463', value: '3-cols-portrait-309_463' },
          { label: '3 cols - Landscape 309x206', value: '3-cols-landscape-309_206' },

          { label: '4 cols - Square 228x228', value: '4-cols-square-228_228' },
          { label: '4 cols - Portrait 228x342', value: '4-cols-portrait-228_342' },
          { label: '4 cols - Landscape 228x152', value: '4-cols-landscape-228_152' },

          // { label: 'List - 1 column', value: 'list-1-column' },
          // { label: 'List - 2 columns', value: 'list-2-columns' }, 
          // { label: 'List - 3 columns', value: 'list-3-columns' },
          // { label: 'List - 4 columns', value: 'list-4-columns' }, 
        ]}
        selected={ props?.option_style ?? '' } 
        onChange={ value => {
          onUpdateQuestionField(value, `field.option_style`)
        } }
      />
    </fieldset>

    <fieldset className="__q-fieldset">
      <legend>Tag Options</legend>

      <table className="bm-table">
        <thead>
          <tr>
            <th></th>
            
            <th>Value</th>
            <th>Label</th> 
            <th>Image URL</th>
            <th></th>
          </tr>
        </thead>

        {
          props.options.length > 0 && 
          <tbody>
            {
              props.options.length > 0 && 
              props.options.map((o, __o_index) => {
                const { __key, value, label, image } = o;
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
                    <div className="__select-image-wrap">
                      <TextField
                        value={ image }
                        onChange={ value => {
                          onChangeOptionField(value, 'image', __o_index); 
                        } }
                        autoComplete="off"
                      />
                      <SelectMedia 
                        onSelect={ media => {
                          // console.log(media);
                          onChangeOptionField(media[0], 'image', __o_index); 
                        } } 
                        title={ 'Select Image' } />
                    </div>
                    {/* <PbSelectImage onSelect={ (media) => {
                      onChangeOptionField(media.shift(), 'image', __o_index);
                    } } /> */}
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