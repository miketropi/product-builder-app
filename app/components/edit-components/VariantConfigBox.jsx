import { useState, useEffect } from 'react';
import BoxConfig from './BoxConfig';

const OPTION_ITEM_DATA_TEMPLATE = () => {
  return {
    __key: (Math.random() + 1).toString(36).substring(7),
    name: 'Option name',
    type: 'options', // options, addon
    description: '',
    options: [
      {
        name: '',
        image: '',
      }
    ]
  }
}

export default function VariantConfigBox({ variant, onChange }) {
  const [ builderData, setBuilderData ] = useState({});

  useEffect(() => {
    setBuilderData(variant.builderData);
  }, [variant])

  const onAddOption = () => {
    let new_builderData = { ...builderData };
    new_builderData.__options.push(OPTION_ITEM_DATA_TEMPLATE())
    setBuilderData(new_builderData);
  }

  return <div className="variant-config-box">
    {
      builderData.__options?.map((i) => {
        return (<BoxConfig key={ i.__key } configData={ i } />)
      })
    }
    <button type="button" className="pb-add-button" onClick={ onAddOption }>+ Add Option</button>
  </div>
}