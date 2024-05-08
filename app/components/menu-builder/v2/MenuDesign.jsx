import { Fragment, useCallback } from 'react';
import { useMenuBuilderContextV2 } from '../../../context/MenuBuilderContextV2'; 
import MenuIcon from './MenuIcon';
import { Icon, Badge } from '@shopify/polaris';
import { EditIcon, PlusIcon } from '@shopify/polaris-icons';
import MenuItemTool from './MenuItemTool';
import { getParents } from '../../../libs/helpers';

export default function MenuDesign() {
  const { 
    menuData, 
    currentItemEdit, setCurrentItemEdit, 
    showAllSub, setShowAllSub,
    isHoverKeys, setIsHoverKeys } = useMenuBuilderContextV2();
  
  const onSelectEditItem = useCallback((e, item) => {
    setCurrentItemEdit(item);
    let __id = e.target.closest('.__item-lv-0').dataset.id;
    let el = document.querySelector(`.__menu-item[data-id="${ item.__key }"]`);
    
    let parentEls = getParents(el, '.__menu-item');
    if(parentEls) {
      let listKeyHover = parentEls.map(e => {
        return e.dataset.id
      })
      setIsHoverKeys(listKeyHover)
    }

    // setShowAllSub(__id);
  }, [])

  const renderMenu = (menu, lv = null, __parent_item) => {
    lv = (lv === null) ? 0 : lv += 1;
    let classesUl = (lv == 0 ? ['menu-builder'] : [
      'menu-builder__sub', 
      `sub-lv__${ lv }`, 
      (__parent_item?.type ? `__type${ __parent_item.type }` : '')]);

    return <ul className={ classesUl.join(' ') }>
      {
        __parent_item?.type && __parent_item.type == '__MEGASHOP_SUBITEM__' && 
        <div 
          className="__menu-item-banner" 
          style={{ background: `url(${ __parent_item.config.background_image }) no-repeat center center / cover, #333` }}>
          {/* { JSON.stringify(__parent_item.config) } */}
          <div className="__menu-item-banner__entry">
            <div className="__parent-name">{ __parent_item.name }</div>
            <div className="__custom-link">
              <a href={ __parent_item.config.custom_url }>{ __parent_item.config.custom_text }</a>
            </div>
          </div>
        </div>
      }
      {
        menu.map(item => {
          const { __key, name, url, children, type, icon } = item;

          // showAllSub
          // console.log([showAllSub, __key, showAllSub == __key])
          let edit = currentItemEdit?.__key == __key ? true : false;
          let liClasses = [
            '__menu-item', 
            `__item-lv-${ lv }`, 
            (item.type ? `__menu-item_type__${ type }` : ''),
            // `${ showAllSub == __key ? '__show-all-sub' : ''}`,
            `${ isHoverKeys?.includes(__key) ? '__is-hover' : '' }`,
            `${ edit ? '__edit-item' : '' }`
          ];

          return <li className={ liClasses.join(' ') } key={ __key } data-id={ __key }>
            <a href={ url } onClick={ function(e) {
              e.preventDefault();
              onSelectEditItem(e, item)
            } }>
              { icon ? <MenuIcon source={ icon } /> : '' } 
              { name } { edit ? <Badge tone="warning">Edit</Badge> : '' }
            </a>
            { edit ? <MenuItemTool menu={ item } level={ lv } type={ type } /> : '' }
            { (children && children.length > 0) && renderMenu(children, lv, item) }
          </li>
        })
      }
    </ul>
  }

  return <div className="menu-design design-mode">
    {/* { JSON.stringify(menuData) } */}
    {
      renderMenu(menuData)
    }
    
  </div>
}