import { useState, useEffect, useCallback } from 'react';
import BoxConfig from './BoxConfig';
import _ from 'lodash';

const { update } = _;

export default function VariantConfigBox({ variant, onChange }) {
  const [ builderData, setBuilderData ] = useState({});

  useEffect(() => {
    if(!variant.builderData) return;
    setBuilderData(variant.builderData);
  }, [variant])

  const onChangeBoxConfig = (value, field, __i_index) => {
    let new_builderData = { ...builderData };
    update(new_builderData, `__options[${ __i_index }].${ field }`, () => value);
    setBuilderData(new_builderData);

    if(onChange) {
      onChange(new_builderData)
    }
  }

  return <div className="variant-config-box">
    {
      builderData.__options?.map((i, __i_index) => {
        return (<BoxConfig 
          key={ i.__key } 
          configData={ i } 
          onChange={ (value, field) => { onChangeBoxConfig(value, field, __i_index) } }
          onDelete={ e => {
            let r = confirm("Are you sure you want to delete?");
            if(!r) return;

            let new_builderData = { ...builderData };
            let __o = new_builderData.__options;
            __o.splice(__i_index, 1);
            update(new_builderData, `__options`, () => __o);
            setBuilderData(new_builderData);
            if(onChange) { onChange(new_builderData) }
          } } />)
      })
    }
  </div>
}