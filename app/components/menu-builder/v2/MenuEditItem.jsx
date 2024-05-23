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

  const onUpdateConfigItem = (value, name) => {
    // console.log(typeof value, name);
    setMenuData(produce(draft => {
      let found = deepSearch(draft, currentItemEdit.__key);
      // console.log(found.config)
      if(!found.config) {
        found.config = {[name]: value};
      } else {
        found.config[name] = value
      }
    }))
    
    let __config = currentItemEdit?.config ? currentItemEdit.config : {};
    let _currentItemEdit = { ...currentItemEdit, config: { ...__config, [name]: value } }
    // _currentItemEdit.config[name] = value;
    setCurrentItemEdit(_currentItemEdit);
  }

  return <fieldset className="__menu-edit-item">
    { JSON.stringify(currentItemEdit?.type) }
    {/* { JSON.stringify(currentItemEdit?.config) } */}
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

    {
      ['__BLOCK_BRAND_ITEM__', '__BLOCK_MENU_IMAGE_ITEM__'].includes(currentItemEdit?.type) == true &&
      <>
        <hr />
        <div style={{ marginBottom: `1em` }}>
          <TextField
            label="Image Url"
            value={ currentItemEdit.image }
            onChange={ value => { onUpdate(value, 'image') } }
            autoComplete="off"
          />
        </div>
      </>
    }

    {
      ['__BLOCK_MENU_IMAGE__'].includes(currentItemEdit?.type) == true && 
      <>
        <hr />
        <div style={{ marginBottom: `1em` }}>
          <Select
            label="Size"
            options={[
              {label: 'Small', value: 'small'},
              {label: 'Medium', value: 'medium'},
              {label: 'Large', value: 'large'},
              {label: 'Fullwidth', value: 'fullwidth'},
              {label: '50%', value: '50'},
            ]}
            onChange={ value => { onUpdateConfigItem(value, 'containerSize') } }
            value={ currentItemEdit?.config?.containerSize }
          />
        </div>
      </>
    }

    {
      ['__MEGASHOP_SUBITEM__'].includes(currentItemEdit?.type) && 
      currentItemEdit?.children?.length > 0 && 
      <>
        <hr />
        <div style={{ marginBottom: `1em` }}>
          <TextField
            label="Background Image"
            value={ currentItemEdit?.config?.background_image }
            onChange={ value => { onUpdateConfigItem(value, 'background_image') } }
            autoComplete="off"
          />
        </div>
        <div style={{ marginBottom: `1em` }}>
          <TextField
            label="Custom Text"
            value={ currentItemEdit?.config?.custom_text }
            onChange={ value => { onUpdateConfigItem(value, 'custom_text') } }
            autoComplete="off"
          />
        </div>
        <div style={{ marginBottom: `1em` }}>
          <TextField
            label="Custom URL"
            value={ currentItemEdit?.config?.custom_url }
            onChange={ value => { onUpdateConfigItem(value, 'custom_url') } }
            autoComplete="off"
          />
        </div>
      </>
    }

    {
      ['__MEGA__'].includes(currentItemEdit?.type) &&
      currentItemEdit?.children?.length > 0 && 
      <>
        {/* container: true,
      container_padding: `20px`,
      container_bottom_custom_text: 'View All Colours',
      container_bottom_custom_url: '#', */}
        <hr />
        <div style={{ marginBottom: `1em` }}>
          <Select
            label="Enable Container"
            options={[
              {label: 'No', value: false},
              {label: 'Yes', value: true},
            ]}
            onChange={ value => {
              let v = (value == 'true' ? true : false);
              onUpdateConfigItem(v, 'container')
            } }
            value={ currentItemEdit?.config?.container ?? false }
          />
        </div>
        <div style={{ marginBottom: `1em` }}>
          <TextField
            label="Container Padding"
            value={ currentItemEdit?.config?.container_padding }
            onChange={ value => { onUpdateConfigItem(value, 'container_padding') } }
            autoComplete="off"
          />
        </div>
        <div style={{ marginBottom: `1em` }}>
          <TextField
            label="Custom Text"
            value={ currentItemEdit?.config?.container_bottom_custom_text }
            onChange={ value => { onUpdateConfigItem(value, 'container_bottom_custom_text') } }
            autoComplete="off"
          />
        </div>
        <div style={{ marginBottom: `1em` }}>
          <TextField
            label="Custom URL"
            value={ currentItemEdit?.config?.container_bottom_custom_url }
            onChange={ value => { onUpdateConfigItem(value, 'container_bottom_custom_url') } }
            autoComplete="off"
          />
        </div>
      </>
    }

    <Button variant="primary">Remove</Button>
  </fieldset>
}