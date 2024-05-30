import { Fragment } from "react";
import { useProductBuilderContext } from "../../context/ProductBuilderContext";
import ReactDragListView from 'react-drag-listview';
import { DragHandleIcon } from '@shopify/polaris-icons';
import { Icon } from "@shopify/polaris";
import OptBoxItemActions from './OptBoxItemActions';

export default function VariantItem({ variant, onSelect, active }) {
  const { editProduct } = useProductBuilderContext();
  const { editProduct__editObject, onOrderingVariantItem_Fn } = editProduct;

  const dragProps = {
    onDragEnd: onOrderingVariantItem_Fn,
    nodeSelector: 'li',
    handleSelector: 'a'
  };

  return <div 
    className={ ['variant-item', (active ? '__selected' : '')].join(' ') } 
    >
    {/* { JSON.stringify(variant) } */}
    <h4 onClick={ e => onSelect(variant) }>
      { variant.displayName } 
      {
        variant?.builderData?.__options.length > 0 &&
        <>
          { ' ' }
          <sup>{ variant?.builderData?.__options.length } item(s)</sup>
        </>
      }
    </h4>
    {
      active && 
      editProduct__editObject.builderData.__options.length > 0 &&
      <ReactDragListView {...dragProps}>
        <ol className="__option-box-nav">
          {
            editProduct__editObject.builderData.__options.map((o, __o_index) => {
              return <li className="__option-box-nav__item" key={ o.__key }>
                <a>
                  <Icon
                    source={DragHandleIcon}
                    tone="base"
                  />
                </a>
                <span>{ o.name }</span>
                <OptBoxItemActions item={ o } />
              </li>
            })
          }
        </ol>
      </ReactDragListView>
    }
    
    {/* { JSON.stringify(editProduct__editObject.builderData.__options) } */}
  </div>
}