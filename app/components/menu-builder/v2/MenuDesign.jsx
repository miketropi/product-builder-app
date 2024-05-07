import { Fragment } from 'react';
import { useMenuBuilderContextV2 } from '../../../context/MenuBuilderContextV2'; 
import MenuIcon from './MenuIcon';
import { Icon } from '@shopify/polaris';
import { EditIcon } from '@shopify/polaris-icons';
import MenuEditItem from './MenuEditItem';

export default function MenuDesign() {
  const { menuData, currentItemEdit, setCurrentItemEdit, showAllSub, setShowAllSub } = useMenuBuilderContextV2();
  
  const renderMenu = (menu, lv = null, __parent_type) => {
    lv = (lv === null) ? 0 : lv += 1;
    let classesUl = (lv == 0 ? ['menu-builder'] : [
      'menu-builder__sub', 
      `sub-lv__${ lv }`, 
      (__parent_type ? `__type${ __parent_type }` : '')]);

    return <ul className={ classesUl.join(' ') }>
      {
        menu.map(item => {
          const { __key, name, url, children, type, icon } = item;
          // showAllSub
          let liClasses = [
            '__menu-item', 
            `__item-lv-${ lv }`, 
            `${ showAllSub == __key ? '__show-all-sub' : ''}`
          ];

          return <li className={ liClasses.join(' ') } key={ __key } data-id={ __key }>
            <a href={ url } onClick={ e =>  {
              e.preventDefault();
              setCurrentItemEdit(item);
              console.log(e.target.closest('.__item-lv-0').dataset.id)
              setShowAllSub(e.target.closest('.__item-lv-0').dataset.id);
            } }>
              { icon ? <MenuIcon source={ icon } /> : '' } 
              { name } 
            </a>
            {
              (children && children.length > 0) && renderMenu(children, lv, type)
            }
          </li>
        })
      }
    </ul>
  }

  return <div className="menu-design design-mode">
    {
      renderMenu(menuData)
    }
  </div>
}