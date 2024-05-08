import { TextField, Button, Select } from '@shopify/polaris';
import { useMenuBuilderContextV2 } from "../../../context/MenuBuilderContextV2";
import { produce } from 'immer';
import { deepSearch } from '../../../libs/helpers';

export default function MenuEditItem() {
  const { menuData, setMenuData, currentItemEdit, setCurrentItemEdit } = useMenuBuilderContextV2();

  const onUpdate = (value, name) => {
    setMenuData(produce(draft => {
      let found = deepSearch(draft, currentItemEdit.__key);
      found ? found[name] = value : '';
    }))

    setCurrentItemEdit({ ...currentItemEdit, [name]: value });
  }

  return <fieldset className="__menu-edit-item">
    {/* { JSON.stringify(currentItemEdit) } */}
    <legend>Edit item</legend>
    <small>{ currentItemEdit.__key }</small>

    <div style={{ marginBottom: `1em` }}>
      <TextField
        label="Name"
        value={ currentItemEdit.name }
        onChange={ value => onUpdate(value, 'name') }
        autoComplete="off"
      />
    </div>

    <div style={{ marginBottom: `1em` }}>
      <TextField
        label="Url"
        value={ currentItemEdit.url }
        onChange={ value => { onUpdate(value, 'url') } }
        autoComplete="off"
      />
    </div>

    <div style={{ marginBottom: `1em` }}>
      <Select
        label="Icon"
        options={[
          // {label: 'Hamburger2', value: 'HB2'},
          {label: 'No', value: ''},
          {label: 'Hamburger', value: 'HB'},
        ]}
        onChange={ value => { onUpdate(value, 'icon') } }
        value={ currentItemEdit.icon }
      />
    </div>

    <Button variant="primary">Remove</Button>
  </fieldset>
}