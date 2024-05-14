import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { menuDataInit } from '../data/menuDataInit';
import { deepSearch, deepSearch_API } from '../libs/helpers';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { subscribe, unsubscribe } from '../libs/events';

const MenuBuilderContextV2 = createContext(null);

const MenuBuilderContextV2_Provider = ({ children }) => {
  const [menuData, setMenuData] = useState(menuDataInit);
  const [currentItemEdit, setCurrentItemEdit] = useState(null);
  const [showAllSub, setShowAllSub] = useState(null);
  const [isHoverKeys, setIsHoverKeys] = useState([]);
  const [modalSelectTemplateActive, setModalSelectTemplateActive] = useState(false);

  const _event = useRef(null);
  const modalSelectTemplateActiveRef = useRef(null);

  useEffect(() => {
    return () => {
      
    }
  }, [])

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
                image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Aged_Brass.png?v=1715325947',
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
            image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Aged_Brass.png?v=1715325947',
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

  const onSelectSubTemplate = useCallback((_cb) => {
    setModalSelectTemplateActive(true);

    const onSelectTemplate = (e) => {
      // console.log(e.detail);
      _cb(e.detail.detail);
      setModalSelectTemplateActive(false);
      unsubscribe('SubMenuOptionsTemplate:Selected', onSelectTemplate);
    }
    
    subscribe('SubMenuOptionsTemplate:Selected', onSelectTemplate);
  }, []) //

  const addChildren_Fn = useCallback((currentItem, level = 0) => {
    if(level == 0) {
      onSelectSubTemplate((template) => {
        // console.log(template)
        let __children = null;
        let __type = '';
        let __config = {}

        switch(template) {
          case 'Image Template':
            __type = '__MEGA__';
            __config = {
              container: true,
              container_padding: `20px`,
              container_bottom_custom_text: 'View All Colours',
              container_bottom_custom_url: '#',
            };
            __children = [
              {
                __key: uuidv4(),
                name: 'INTREND COLOURS', 
                url: '#',
                type: '__BLOCK_MENU_IMAGE__',
                config: {
                  containerSize: 'fullwidth', 
                },
                children: [
                  { 
                    __key: uuidv4(),
                    name: 'Aged Brass', 
                    image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Aged_Brass.png?v=1715325947',
                    url: '#',
                    type: '__BLOCK_MENU_IMAGE_ITEM__',
                  },
                ]
              }
            ];
            break;
          
          case 'Brand Template':
            __type = '__MEGA__';
            __children = [
              {
                __key: uuidv4(),
                name: '', 
                url: '',
                type: '__BLOCK_BRAND__',
                children: [
                  { 
                    __key: uuidv4(),
                    name: 'ADP', 
                    image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/ADP.png?v=1715158385',
                    url: '#',
                    type: '__BLOCK_BRAND_ITEM__',
                  },
                ]
              }
            ]
            break;

          case 'Classic Template':
            __children = [
              { 
                __key: uuidv4(),
                name: 'New Item #1', 
                url: '#' 
              }
            ]
            break;
        }

        setMenuData(produce(draft => {
          let found = deepSearch_API(draft, currentItem.__key);
          found.type = __type;
          found.config = __config;
          if(__children != null) {
            found.children = __children;
          }
        }))
      })
    } else {
      let __type = currentItem?.type;
      let __children = null;
      let __config = {};

      switch(__type) {
        case '__MEGASHOP_SUBITEM__':
          __config = {
            background_image: 'https://images.unsplash.com/photo-1714399727269-7883d5d66da2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            custom_text: 'View All',
            custom_url: '#',
          };
          __children = [
            {
              __key: uuidv4(),
              name: 'Heading Text',
              url: '#',
              type: '__BLOCK_MENU__',
              children: [
                { 
                  __key: uuidv4(),
                  name: 'Menu Item #1', 
                  url: '#',
                  type: '__BLOCK_MENU_ITEM__',
                },
              ]
            },
          ];
          break;
        
        default:
          // __children = [
          //   { 
          //     __key: uuidv4(),
          //     name: 'New Item #1', 
          //     url: '#' 
          //   }
          // ]
          break;
      }

      setMenuData(produce(draft => {
        let found = deepSearch_API(draft, currentItem.__key);
        found.type = __type;
        found.config = __config;
        if(__children != null) {
          found.children = __children;
        }
      }))
      
    }
  }, [])

  const removeItem_Fn = useCallback((currentItem, level) => {
    setMenuData(produce(draft => {
      let found = deepSearch_API(draft, currentItem.__key);
      const { parentNode, node } = found.hook();
      const currentIndex = parentNode.indexOf(node);
      parentNode.splice(currentIndex, 1);
    }))
  }, []);

  const moveItem_Fn = useCallback((currentItem, level, step) => {
    setMenuData(produce(draft => {
      let found = deepSearch_API(draft, currentItem.__key);
      const { parentNode, node } = found.hook();
      const currentIndex = parentNode.indexOf(node);
      let saveItem = parentNode[currentIndex];
      
      parentNode.splice(currentIndex, 1);
      parentNode.splice(currentIndex + step, 0, saveItem);
    }))
  }, [])

  const value = {
    menuData, setMenuData,
    currentItemEdit, setCurrentItemEdit,
    showAllSub, setShowAllSub,
    isHoverKeys, setIsHoverKeys,
    modalSelectTemplateActive, setModalSelectTemplateActive, modalSelectTemplateActiveRef, _event,
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