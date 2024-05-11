import { useState, useCallback } from "react";
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

export default function MenuItemTool({ menu, level, parent }) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <span className="__button-toggle-actions" onClick={togglePopoverActive}>
      <Icon source={ PlusIcon } />
    </span>
  );

  const actions = [
    { content: `${ level == 0 ? 'Move Left' : 'Move Up' }`, icon: (level == 0 ? ArrowLeftIcon : ArrowUpIcon) }, 
    { content: `${ level == 0 ? 'Move Right' : 'Move Down' }`, icon: (level == 0 ? ArrowRightIcon : ArrowDownIcon) },
    { content: 'Add Next Item', icon: NoteAddIcon },
    { content: 'Add Children', icon: NoteAddIcon },
    { content: 'Remove', icon: DeleteIcon },
  ]
 
  return <div className="__menu-item-tool">
    <Popover
      active={popoverActive}
      activator={activator}
      autofocusTarget="first-node"
      onClose={togglePopoverActive}
    >
      <ActionList
        actionRole="menuitem"
        items={ actions }
      />
    </Popover>
  </div>
}