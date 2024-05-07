import { Icon } from '@shopify/polaris';
import { produce } from 'immer';
import { useMenuBuilderContext } from '../../context/MenuBuilderContext';
import { TextField, Button } from '@shopify/polaris';
import { deepSearch } from '../../libs/helpers';
import { 
  DragHandleIcon, 
  CaretDownIcon,
  CaretUpIcon,
  XSmallIcon
} from '@shopify/polaris-icons';

const MenuItemTransport = ({ menuItem }) => {
  const { menuBuilderData } = useMenuBuilderContext();
  // return <div>{ JSON.stringify(menuBuilderData.menuData.filter(i => i.parent == menuItem.__key)) }</div>
  
  const renderSubItemTransport = (__key) => {
    let found = [...menuBuilderData.menuData].filter(i => i.parent == __key);
    if(found.length == 0) return;

    return <ul className="__menu-transport-ul">
      { 
        found.map(i => {
          let { __key, name } = i;
          return <li key={ __key } className="__menu-transport-li">
            <div>{ name }</div>
            { renderSubItemTransport(__key) }
          </li>
        }) 
      }
    </ul>
  }

  return <div className="__menu-transport">
    { renderSubItemTransport(menuItem.__key) }
  </div>
}

export default function MenuItemEditor({ menu, active, onSelect, level }) {
  const { menuBuilderData, setMenuBuilderData, currentDragItem, groupItemDrag } = useMenuBuilderContext();
  const { __key, __type, name, url } = menu;

  const configBy__Type = (type) => {
    const __Fn = {
      'Custom Link': () => {
        return (
          <div className="__config-item">
            <fieldset className="fieldset-ui">
              <legend>Edit menu item</legend>
              <div className="__field-item">
                <TextField label="Name" value={ name } onChange={ value => {
                  setMenuBuilderData(produce(draft => {
                    let found = deepSearch(draft.menuData, menu.__key);
                    found ? found.name = value : '';
                  }));
                } } autoComplete="off" />
              </div>
              <div className="__field-item">
                <TextField label="Url" value={ url } onChange={ value => {
                  setMenuBuilderData(produce(draft => {
                    let found = deepSearch(draft.menuData, menu.__key);
                    found ? found.url = value : '';
                  }));
                } } autoComplete="off" />
              </div>
            </fieldset>
            <div style={{ marginBottom: '.5em' }}></div>
            <Button icon={ XSmallIcon } variant="plain" tone="critical" onClick={ e => {
              let r = confirm('Are you sure you want to delete item?');
              if(!r) return;
  
              const deletedTodosArray = produce([...menuBuilderData.menuData], draft => {
                const index = draft.findIndex(item => item.__key === __key)
                if (index !== -1) draft.splice(index, 1)
              });
              setMenuBuilderData({ ...menuBuilderData, menuData: deletedTodosArray })
            } }>Remove</Button>
          </div>
        )
      }
    }
  
    return __Fn[type]();
  }

  const dragNumber = (
    currentDragItem == menu.__key && groupItemDrag.length > 0 &&
    <span>({ groupItemDrag.length })</span>
  )

  return <>
    { 
      // ! groupItemDrag.includes(menu.__key) && 
      <div 
        className={ ['menu-builder__visual-editor-li', `level_${ level }`, (active ? '__active' : '')].join(' ') } 
        style={{ paddingLeft: `${ parseInt(level) * 15 }px` }}
        >
        <div className="__heading-item">
          {/* { JSON.stringify(groupItemDrag) } */}
          <div className="__drag-icon"><Icon source={ DragHandleIcon } /></div>
          <div className="__menu-name">{ name } { dragNumber }</div>
          <div className="__toggle-config" onClick={ e => onSelect(menu) }>
            <Icon source={ active ? CaretUpIcon : CaretDownIcon } />
          </div>
        </div>
        { active && configBy__Type(__type) }
      </div>
    }
    
  </>
}