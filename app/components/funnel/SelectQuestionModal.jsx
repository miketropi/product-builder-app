import { useState, useCallback } from 'react';
import { useFunnelEditContext } from "../../context/FunnelEditContext";
import { QuestionCircleIcon, PlusIcon } from '@shopify/polaris-icons';
import { 
  Button, 
  Modal, 
  ResourceList,
  Icon,
  Text,
  ResourceItem } from '@shopify/polaris';

export default function SelectQuestionModal({ onSelect }) {
  const { questions } = useFunnelEditContext();
  const [ active, setActive ] = useState(false);
  const handleChange = useCallback( () => setActive(!active), [active] );

  const activator = <Button icon={ PlusIcon } onClick={ handleChange }>Add Question</Button>;

  return <>
    <Modal
      activator={ activator }
      open={ active }
      title="Select Question"
      onClose={ handleChange }
    >
      <ResourceList 
        items={ questions }
        renderItem={ (item, id, index) => {
          const { __key, question } = item
          return (
            <ResourceItem
              id={ __key } 
              media={ <Icon source={ QuestionCircleIcon } /> }
              onClick={ id => {
                onSelect(id);
                setActive(false);
              } } >
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                { index + 1 }. { question }
              </Text>
            </ResourceItem> 
          )
        } }
      />
    </Modal>
  </>
}