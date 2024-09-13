import { Button, Popover, ActionList } from '@shopify/polaris';
import { SettingsIcon, ArchiveIcon, DuplicateIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import { useFunnelEditContext } from "../../context/FunnelEditContext";

export default function QuestionEditTool() {
  const { fn } = useFunnelEditContext();
  const { onCloneEditItem } = fn
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button icon={ SettingsIcon }  onClick={toggleActive} disclosure></Button>
  );

  return <div className="funnel-question-edit-tool">
    <Popover
      active={ active }
      activator={ activator }
      autofocusTarget="first-node"
      onClose={ toggleActive }
    >
      <ActionList
        actionRole="menuitem"
        items={[ 
          { content: 'Duplicate', icon: DuplicateIcon, onAction: () => {
            onCloneEditItem();
            setActive(false);
          } },
        ]}
      />
    </Popover>
  </div>
}