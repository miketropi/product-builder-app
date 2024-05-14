import { useMenuBuilderContextV2 } from "../../../context/MenuBuilderContextV2";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button, Badge } from '@shopify/polaris';
import { publish } from '../../../libs/events';

export default function SubMenuOptionsTemplate({ onSelect, open, onClose }) {
  const [value, setValue] = useState('');

  const __onSelect = (value) => {
    setValue(value);
  }

  const __onChoose = useCallback(() => { 
    onSelect(value);
    publish('SubMenuOptionsTemplate:Selected', { detail: value });
  }, [value])

  const template_opts = [
    {
      __key: '99003b23-e12d-4a4d-98dd-f864fbda612d',
      name: 'Classic Template',
      image: 'https://shopify-dev.beplusprojects.com/storage/uploads/2024/05/13/classic-template_uid_6641d66e16969.png',
    },
    {
      __key: '51ab05a7-06fe-4562-b1d7-19a5f37b4496',
      name: 'Brand Template',
      image: 'https://shopify-dev.beplusprojects.com/storage/uploads/2024/05/13/brand-template_uid_6641d66e0511b.png',
    },
    {
      __key: '3bcf2f78-8d26-4004-80b8-38e028f90f42',
      name: 'Image Template',
      image: 'https://shopify-dev.beplusprojects.com/storage/uploads/2024/05/13/block-image-template_uid_6641d66dd3f25.png',
    },
  ];

  return <div className={ ['sub-menu-options-template', open ? '__open' : ''].join(' ') }>
    <div className="sub-menu-options-template__inner">
      <h2 className="__heading">Select Template</h2>
      {
        template_opts.map((item) => {
          const { __key, name, image } = item;
          const __isSelected = (value == name ? true : false);
          return <div 
            className={ ['template-item', (__isSelected ? '__active' : '')].join(' ') } 
            key={ __key } 
            onClick={ e => __onSelect(name) }>
            <fieldset>
              <legend>{ name } { __isSelected ? <Badge tone="success">Selected</Badge> : '' }</legend>
              <img src={ image } alt={ `#${ name }` } />
            </fieldset>
          </div> 
        })
      }
      <div className="__actions">
        <Button variant="primary" onClick={ __onChoose } >Select Template</Button>
        <Button onClick={ onClose }>Close</Button>
      </div>
    </div>
  </div>
}