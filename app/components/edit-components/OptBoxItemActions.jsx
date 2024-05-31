import { useState, useCallback, useEffect } from "react";
import { Button, Icon, Popover, ActionList } from "@shopify/polaris"
import { SettingsIcon, ClipboardIcon } from '@shopify/polaris-icons';
import { useProductBuilderContext } from "../../context/ProductBuilderContext";

export default function OptBoxItemActions({ item }) {
  const { editProduct } = useProductBuilderContext();
  const {
    copyData, setCopyData,
    copyHanndle_Fn, pasteHanndle_Fn
  } = editProduct;
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} size={ 'slim' } icon={ SettingsIcon }></Button>
  );

  return <div className="opt-box-item-actions">
    <Popover
      active={popoverActive}
      activator={activator}
      autofocusTarget="first-node"
      onClose={togglePopoverActive}
    >
      <Popover.Pane>
        <ActionList
          actionRole="menuitem"
          items={[
            { content: 'Copy Config', icon: ClipboardIcon, onAction: () => { 
              copyHanndle_Fn(item);
              setPopoverActive(false);
            } },
            { content: 'Paste Config', disabled: (copyData ? false : true), icon: ClipboardIcon, 
              onAction: () => { 
                pasteHanndle_Fn(item);
                setPopoverActive(false);
              } },
          ]}
        />
      </Popover.Pane>
    </Popover>
  </div>
}