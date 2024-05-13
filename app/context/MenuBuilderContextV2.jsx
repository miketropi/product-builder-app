import { createContext, useContext, useState, useEffect } from 'react';
import { menuDataInit } from '../data/menuDataInit';
import { deepSearch, deepSearch_API } from '../libs/helpers';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

const MenuBuilderContextV2 = createContext(null);

const MenuBuilderContextV2_Provider = ({ children }) => {
  const [menuData, setMenuData] = useState(menuDataInit);
  const [currentItemEdit, setCurrentItemEdit] = useState(null);
  const [showAllSub, setShowAllSub] = useState(null);
  const [isHoverKeys, setIsHoverKeys] = useState([]);

  const addNextItem_Fn = (currentItem, level = 0) => {
    // console.log(currentItem);
    setMenuData(produce(draft => {
      let found = deepSearch_API(draft, currentItem.__key);
      const { parentNode, node } = found.hook();
      const currentIndex = parentNode.indexOf(node);

      switch(node.type) {
        case '__BLOCK_MENU__': 
          parentNode.splice((currentIndex + 1), 0, { 
            __key: uuidv4(),
            name: 'New Item', 
            url: '#',
            type: '__BLOCK_MENU__',
            children: [
              { 
                __key: uuidv4(),
                name: 'Child Item', 
                url: '#' 
              },
            ]
          });
          break;

        case '__BLOCK_MENU_IMAGE__':
          parentNode.splice((currentIndex + 1), 0, { 
            __key: uuidv4(),
            name: 'New Item', 
            image: '',
            url: '#',
            type: '__BLOCK_MENU_IMAGE__',
            config: {
              containerSize: 'fullwidth',
            },
            children: [
              { 
                __key: uuidv4(),
                name: 'New Item', 
                image: '',
                url: '#',
                type: '__BLOCK_MENU_IMAGE_ITEM__',
              },
            ]
            });
          break;
        
        case '__BLOCK_MENU_IMAGE_ITEM__':
          parentNode.splice((currentIndex + 1), 0, { 
            __key: uuidv4(),
            name: 'New Item', 
            image: '',
            url: '#',
            type: '__BLOCK_MENU_IMAGE_ITEM__',
          });
          break;

        case '__MEGASHOP_SUBITEM__': 
          parentNode.splice((currentIndex + 1), 0, { 
            __key: uuidv4(),
            name: 'New Item', 
            url: '#',
            type: '__MEGASHOP_SUBITEM__',
          });
          break;
        
        default: 
          let newItem = { 
            __key: uuidv4(),
            name: 'New Item', 
            url: '#'
          };

          if(node?.type) {
            newItem.type = node.type;
          }

          parentNode.splice((currentIndex + 1), 0, newItem);
          break;
      }

      // console.log(parentNode.indexOf(node))
      // found.hook().data[0].name = '_____ editd';
      // console.log(found.hook().data[0].name);
    }))
  }

  const addChildren_Fn = (menu, level = 0) => {
    
  }

  const removeItem_Fn = () => {

  }

  const moveItem_Fn = () => {

  }

  const value = {
    menuData, setMenuData,
    currentItemEdit, setCurrentItemEdit,
    showAllSub, setShowAllSub,
    isHoverKeys, setIsHoverKeys,
    editFn: {
      addNextItem_Fn, 
      addChildren_Fn,
      removeItem_Fn,
      moveItem_Fn
    }
  }

  return <MenuBuilderContextV2.Provider value={ value }>
    { children }
  </MenuBuilderContextV2.Provider>
}

const useMenuBuilderContextV2 = () => {
  return useContext(MenuBuilderContextV2);
}

export { MenuBuilderContextV2_Provider, useMenuBuilderContextV2 }