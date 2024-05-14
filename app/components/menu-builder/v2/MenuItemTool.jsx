import { useMenuBuilderContextV2 } from '../../../context/MenuBuilderContextV2';
import { useState, useCallback, useEffect } from "react";
import { Button, Popover, ActionList, Icon } from "@shopify/polaris";
import { 
  MenuHorizontalIcon, 
  PlusIcon, SortAscendingIcon, 
  SortDescendingIcon, 
  DeleteIcon, 
  NoteAddIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon } from "@shopify/polaris-icons";

export default function MenuItemTool({ menu, level, parent, num_index }) {
  const { editFn } = useMenuBuilderContextV2();
  const { 
    addNextItem_Fn, 
    addChildren_Fn,
    removeItem_Fn,
    moveItem_Fn } = editFn;

  const [popoverActive, setPopoverActive] = useState(false);
  const [actionList, setAcctionList] = useState([]);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <span className="__button-toggle-actions" onClick={togglePopoverActive}>
      <Icon source={ PlusIcon } />
    </span>
  );

  const onAddNextItem = useCallback(() => {
    addNextItem_Fn(menu, level)
    setPopoverActive(false);
  })

  const onAddChildren = useCallback(() => {
    addChildren_Fn(menu, level)
    setPopoverActive(false);
  })

  const onRemoveItem = useCallback(() => {
    removeItem_Fn(menu, level);
    setPopoverActive(false);
  })

  const onMoveItem = useCallback((step) => {
    moveItem_Fn(menu, level, step);
    setPopoverActive(false);
  })

  useEffect(() => {
    // console.log(!menu.children, (menu?.children?.length))
    let actions = {
      actionMove__Up: (() => {
        return { 
          content: `${ level == 0 ? 'Move Left' : 'Move Up' }`, 
          icon: (level == 0 ? ArrowLeftIcon : ArrowUpIcon),
          onAction: () => onMoveItem(-1)
        }
      })(),
      actionMove__Down: (() => {
        return { 
          content: `${ level == 0 ? 'Move Right' : 'Move Down' }`, 
          icon: (level == 0 ? ArrowRightIcon : ArrowDownIcon),
          onAction: () => onMoveItem(1)
        }
      })(),
      actionAddNextItem: (() => {
        return (([
          '__BLOCK_BRAND__', 
        ].includes(menu?.type) == false) ? {
          content: 'Add Next Item', 
          icon: NoteAddIcon,
          onAction: onAddNextItem
        } : false)
      })(),
      actionAddChildren: (() => {
        // console.log(['__BLOCK_MENU_IMAGE_ITEM__'].includes(menu?.type));
        if(menu?.children && menu?.children.length > 0) {
          return false;
        }

        return (([
          '__BLOCK_MENU_IMAGE_ITEM__', 
          '__BLOCK_BRAND_ITEM__',
          '__BLOCK_MENU_ITEM__',
        ].includes(menu?.type) == false) ? { 
          content: 'Add Children', 
          icon: NoteAddIcon,
          onAction: onAddChildren,
        } : false);
      })(),
      actionDeleteItem: (() => {
        return {
          content: 'Remove', 
          icon: DeleteIcon,
          onAction: onRemoveItem,
        }
      })()
    }
    
    // console.log(actions);
    setAcctionList(actions);

  }, [menu])

  return <div className="__menu-item-tool">
    <Popover
      active={popoverActive}
      activator={activator}
      autofocusTarget="first-node"
      onClose={togglePopoverActive}
    >
      <ActionList
        actionRole="menuitem"
        items={ Object.values(actionList).filter(a => a != false) }
      />
    </Popover>
  </div>
}