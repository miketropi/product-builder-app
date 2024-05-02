import { useState, useCallback } from "react";
import { useMenuBuilderContext } from "../../context/MenuBuilderContext";
import { Icon, Button, Popover, ActionList } from '@shopify/polaris';
import { 
  DragHandleIcon, 
  PlusIcon, 
  LinkIcon, 
  ProductAddIcon, 
  CollectionReferenceIcon, 
  PageAddIcon,
  CaretDownIcon,
  CaretUpIcon } from '@shopify/polaris-icons';

const __MENU_TYPES = [
  { content: 'Custom Link', icon: LinkIcon },
  { content: 'Product', icon: ProductAddIcon },
  { content: 'Collection', icon: CollectionReferenceIcon },
  { content: 'Page', icon: PageAddIcon },
];

export default function MenuVisualEditor() {
  const { menuBuilderData, currentEditMenuItem, newMenuItem_Fn, onAddMenuItem_Fn, onSelectEditMenuItem_Fn } = useMenuBuilderContext(); 
  const [popoverActive, setPopoverActive] = useState(false);

  const activator = (
    <Button icon={ PlusIcon } disclosure onClick={ e => setPopoverActive(!popoverActive) }>
      Add menu item
    </Button>
  );

  const onAddMenuItem = (item) => {
    const newItem = newMenuItem_Fn(item.content)
    onAddMenuItem_Fn(newItem);

    setPopoverActive((popoverActive) => !popoverActive)
  }

  return <div className="menu-builder__visual-editor">  
    <div>
      <ul className="menu-builder__visual-editor-ul">
        { menuBuilderData?.menuData.map(item => {
          const { __key, name } = item;
          const __active = (item.__key == currentEditMenuItem?.__key ? true : false)
          return <li 
            key={ __key } 
            className={ ['menu-builder__visual-editor-li', __active ? '__active' : ''].join(' ') } 
            onClick={ e => onSelectEditMenuItem_Fn(item) }>
            <div className="__heading-item">
              <div className="__drag-icon"><Icon source={ DragHandleIcon } /></div>
              <div className="__menu-name">{ name }</div>
              <div className="__toggle-config"><Icon source={ __active ? CaretUpIcon : CaretDownIcon } /></div>
            </div>
            {
              __active && 
              <div className="__config-item">
                config...!
              </div>
            }
          </li>
        }) }
      </ul>
    </div>
    
    <Popover
      active={ popoverActive }
      activator={ activator }
      autofocusTarget="first-node"
      onClose={ e => setPopoverActive(false) }
    >
      <Popover.Pane>
        <ActionList
          actionRole="menuitem"
          items={__MENU_TYPES.map(item => {
            return { ...item, onAction: () => onAddMenuItem(item) }
          })}
        />
      </Popover.Pane>
    </Popover>    
  </div>     
} 