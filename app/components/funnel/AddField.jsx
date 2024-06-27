import { useFunnelEditContext } from '../../context/FunnelEditContext';
import {
  Button, 
  Modal, 
  Icon,
  ResourceList,
  ResourceItem,
  Text,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {
  FormsIcon,
  CursorOptionIcon,
  MetafieldsIcon
} from '@shopify/polaris-icons';

const __FIELDS = [
  {
    __key: 'text_field_157c4c21-f708-4517-b309-a7b054bc52e8',
    icon: FormsIcon,
    name: 'Text Field',
    c: 'QTextField',
  },
  {
    __key: 'single_choice_74f9b82d-b43b-4d33-95ba-0204bf187409',
    icon: CursorOptionIcon,
    name: 'Single Choice',
    c: 'QSingleChoice',
  },
  {
    __key: 'multiple_choice_4ea07a57-9aca-4f2a-b3fe-3394c692b498',
    icon: CursorOptionIcon,
    name: 'Multiple Choice',
    c: 'QMultipleChoice',
  }
]

export default function AddField() {
  const { fn } = useFunnelEditContext();
  const { onAddField } = fn; 

  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const activator = <Button icon={ MetafieldsIcon } onClick={handleChange}>Select Field</Button>;

  return <div className="add-field-comp">
    <div className="add-field-comp__inner">
      <Modal
        activator={activator}
        open={active}
        title="Select Field"
        onClose={ handleChange }
      >
        <ResourceList
          items={ __FIELDS }
          renderItem={ i => {
            const { icon, name, c } = i;
            return <ResourceItem
              id={ c }
              media={ <Icon source={ icon } /> }
              onClick={ id => {
                onAddField(id);
                setActive(false);
              } }
              >
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                { name }
              </Text>
            </ResourceItem>
          } }
        />
      </Modal>
    </div>
  </div>
}