import { Fragment } from 'react';
import PbButton from '../PbButton';
import PbSelectImage from '../PbSelectImage';
import { PlusIcon } from '@shopify/polaris-icons';
import { useAppBridge } from '@shopify/app-bridge-react';
import { 
  Button, 
  Select, 
  LegacyCard,
  ResourceList,
  ResourceItem,
  Thumbnail,
  Text,
  Badge,
  Checkbox
} from '@shopify/polaris';

export default function BoxConfig({ configData, onChange, onDelete }) {
  const shopify = useAppBridge();
  const onUpdateField = (value, name) => {
    onChange(value, name);
  }

  const onAddMoreOption = () => {
    let __o = [...configData.options];
    const rand = (Math.random() + 1).toString(36).substring(7);
    __o.push({
      __key: `__${ rand }`,
      name: '',
      image: '',
    });

    onUpdateField(__o, 'options');
  }

  const onAddMoreAddon = () => {
    let __a = [...configData.addons];
    __a.push({
      __key: `__${ (Math.random() + 1).toString(36).substring(7) }`,
      name: '',
      products: [],
    })

    onUpdateField(__a, 'addons');
  }

  const onAddProduct = async (__a_index) => {
    const selected = await shopify.resourcePicker({type: 'product', multiple: true, showVariants: false });
    if(!selected) return;
    const items =  selected.map((__product) => {
      const { id, title, images, variants, handle } = __product;
      return { 
        id, title, images, handle, 
        variants: variants.map(({ id, title, displayName, price, image }) => {
          return { id, title, displayName, price, image }
        })
      }
    })

    let __a = [...configData.addons];
    let __products = __a[__a_index].products;
    __products.push(...items)
    onUpdateField(__products, `addons[${ __a_index }].products`);
  }

  const onRemoveProduct = (__a_index, __p_index) => {
    const r = confirm('Are you sure you want to remove?');
    if(!r) return;
    
    let __a = [...configData.addons];
    let __products = __a[__a_index].products;
    __products.splice(__p_index, 1);
    onUpdateField(__products, `addons[${ __a_index }].products`);
  }

  const onRemoveOptionItem = (index) => {
    let __o = [...configData.options];
    __o.splice(index, 1);
    onUpdateField(__o, 'options');
  }

  const onRemoveAddonItem = (index) => {
    let __a = [...configData.addons];
    __a.splice(index, 1);
    onUpdateField(__a, 'addons');
  }

  const __TYPE_OPTIONS = (<fieldset>
    <legend>Options</legend>
    <div className="group-option">
      {/* { JSON.stringify(configData.options) } */}
      {
        configData.options && 
        configData.options.map((o, __o_index) => {
          return <div className="group-option__item" key={ __o_index }>
            <PbButton 
              text={ '✕' } 
              classes={ '__close' } 
              title={ 'Remove item' } 
              onClick={ e => {
                let r = confirm('Are you sure you want to remove?')
                if(!r) return;
                
                onRemoveOptionItem(__o_index);
              } } />
            <label>
              <span>Name</span>
              <input type="text" value={ o.name } onChange={ e => {
                onUpdateField(e.target.value, `options[${ __o_index }].name`)
              } } />
            </label>
            <label>
              <span>Image URl</span>
              <input type="text" value={ o.image } onChange={ e => {
                onUpdateField(e.target.value, `options[${ __o_index }].image`)
              } } />
              <PbSelectImage onSelect={ (media) => {
                onUpdateField(media.shift(), `options[${ __o_index }].image`);
              } } />
            </label>
          </div>
        })
      }

      <PbButton text={ '+ Add More' } classes={ '__small' } onClick={ e => {
        e.preventDefault();
        onAddMoreOption();
      } } />
    </div>
  </fieldset>)

  const __TYPE_ADDONS = (<>
    <label className="box-config__field">
      <Checkbox
        label="Addon Multiple Selection"
        checked={ configData?.addon_multiple ?? false }
        onChange={ value => {
          // console.log(value);
          onUpdateField(value, `addon_multiple`)
        } }
      />
    </label>
    <br />
    <fieldset>
      <legend>Addons</legend>
      <div className="group-option">
        { 
          configData.addons && 
          configData.addons.map((a, __a_index) => {
            return <div className="group-option__item" key={ __a_index }>
              <PbButton 
                text={ '✕' } 
                classes={ '__close' } 
                title={ 'Remove item' } 
                onClick={ e => {
                  let r = confirm('Are you sure you want to remove?')
                  if(!r) return;
                  
                  onRemoveAddonItem(__a_index);
                } } />
              <label>
                <span>Name</span>
                <input type="text" value={ a.name } onChange={ e => {
                  onUpdateField(e.target.value, `addons[${ __a_index }].name`)
                } } />
              </label>
              <div className="asLabel">
                <span>Products</span>
                <div style={{ width: '100%' }}>
                  {
                    a.products.length > 0 &&
                    <>
                      <LegacyCard>
                        <ResourceList
                          items={ a.products }
                          renderItem={ ({ id, title, images, variants }, __id, __p_index) => {
                            let thumb = (<Thumbnail
                              source={ ((images && images.length > 0) ? images[0]?.originalSrc : '') }
                              size="small"
                              alt={ title }
                            />);

                            const shortcutActions = [
                              { 
                                content: 'Remove',
                                onAction: e => {
                                  onRemoveProduct(__a_index, __p_index);
                                }
                              },
                            ]

                            return (<ResourceItem
                              id={ id }
                              verticalAlignment="center"
                              // shortcutActions={ shortcutActions }
                              onClick={ e => { onRemoveProduct(__a_index, __p_index); } }
                              media={ thumb }
                            >
                              <Text variant="bodyMd" fontWeight="bold" as="h4">{ title }</Text>
                              <div>
                                {
                                  variants &&
                                  variants.map(v => { 
                                    return <small key={ v.id }><u size="small">{ v.title }</u> { ' ' }</small>
                                  })
                                }
                              </div>
                            </ResourceItem>)
                          } }
                        />
                      </LegacyCard>
                      <br />
                    </>
                  }
                  <Button icon={ PlusIcon } onClick={ e => onAddProduct(__a_index) }>Add Product</Button>
                </div>
              </div>
            </div>
          })
        }
        <PbButton text={ '+ Add More' } classes={ '__small' } onClick={ e => {
          e.preventDefault();
          onAddMoreAddon();
        } } />
      </div>
    </fieldset>
  </>)

  return <div className="box-config">
    <fieldset>
      <legend>{ configData.name }</legend>

      <label className="box-config__field">
        <span className="box-config__title">Name</span>
        <input 
          type="text" 
          value={ configData.name } 
          onChange={ e => {
            onUpdateField(e.target.value, 'name')
          } } />
      </label>
      <label className="box-config__field">
        <span className="box-config__title">Description</span>
        <textarea 
          value={ configData.description } 
          onChange={ e => {
            onUpdateField(e.target.value, 'description')
        } }></textarea>
      </label>
      <label className="box-config__field">
        <span className="box-config__title">Type</span>
        <Select
          options={ [ 
            { label: 'Options', value: 'options' },
            { label: 'Addon', value: 'addon' },
          ] }
          onChange={ value => {
            onUpdateField(value, 'type')
          } }
          value={ configData.type }
        />
      </label>
      <div className="box-config__repeater">
        {
          ((__type) => {
            if(__type == 'options') return __TYPE_OPTIONS;
            if(__type == 'addon') return __TYPE_ADDONS;
          })(configData.type)
        }
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PbButton classes={ '__small' } text={ 'Delete Item' } onClick={ onDelete } />
      </div>
    </fieldset>
  </div>
}