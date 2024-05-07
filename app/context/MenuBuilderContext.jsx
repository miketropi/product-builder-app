import { createContext, useContext, useState, useEffect } from "react";
import { SettingsIcon, PaintBrushFlatIcon, CodeIcon } from '@shopify/polaris-icons';
import _ from 'lodash';

const { update } = _;

const __MENU_BUILDER_DATA = {
  general: {
    title: "Menu"
  },
  style: {
    global_FontFamily: 'Arial',
    global_FontSize: '16px',
    global_Color: '#000000'
  },
  cssEditor: {
    content: ''
  }, 
  menuData: []
}

const __TOOLTAB_DATA = [
  {
    __key: '8308c163-0ba7-4852-922e-834a6360e45e',
    name: 'General',
    icon: SettingsIcon,
  },
  {
    __key: '3bf0a5af-c1ad-459a-bff0-730e17d6d2b1',
    name: 'Style',
    icon: PaintBrushFlatIcon,
    content: ''
  },
  {
    __key: 'e40cf395-6127-49e7-af01-21446fe3c2c1',
    name: 'CSS Editor',
    icon: CodeIcon,
    content: ''
  },
] 

const MenuBuilderContext = createContext(null);

export default function MenuBuilderContext_Provider ({ children, store }) { 
  const [currentTab, setCurrentTab] = useState(null);
  const [menuToolTabData, setMenuToolTabData] = useState(null);
  const [menuBuilderData, setMenuBuilderData] = useState(null);
  const [currentEditMenuItem, setCurrentEditMenuItem] = useState(null);
  const [currentDragItem, setCurrentDragItem] = useState(null);
  const [groupItemDrag, setGroupItemDrag] = useState([]);

  useEffect(() => {
    setCurrentTab(__TOOLTAB_DATA[0].__key);
    setMenuToolTabData(__TOOLTAB_DATA);
    setMenuBuilderData(__MENU_BUILDER_DATA);
  }, [])

  const onChangeCurrentTab_Fn = (key) => {
    setCurrentTab(key)
  }

  const onUpdateBuilderData_Fn = (value, pathObject) => {
    const newMenuBuilderData = { ...menuBuilderData }
    update(newMenuBuilderData, pathObject, () => value);
    setMenuBuilderData(newMenuBuilderData);
  }

  const newMenuItem_Fn = (type = 'Custom Link', parent = null) => {
    let __key = `__key-${ Date.now().toString(36) + Math.random().toString(36).substr(2) }`;
    switch (type) {
      case 'Custom Link':
        return {
          __type: type,
          __key,
          name: `Menu Item #${ menuBuilderData.menuData.length + 1 }`,
          url: '',
          parent: parent,
        }
        break;
    }
  } 

  const onAddMenuItem_Fn = (value) => { 
    const newMenuBuilderData = { ...menuBuilderData };
    newMenuBuilderData.menuData.push(value);
    setMenuBuilderData(newMenuBuilderData);
  }

  const onSelectEditMenuItem_Fn = (menuItem) => {
    if(menuItem.__key == currentEditMenuItem?.__key) {
      setCurrentEditMenuItem(null);
    } else {
      setCurrentEditMenuItem(menuItem);
    }   
  }

  const getItemChildren_Fn = (__key) => {
    // const { menuBuilderData } = useMenuBuilderContext();
    let items = [];
  
    const __deep = (__key) => {
      let found = [...menuBuilderData.menuData].filter(i => i.parent == __key);
      if(found.length == 0) return;    
      items.push(...found.map(i => i.__key));
      for(let i = 0; i <= (found.length - 1); i += 1) {
        __deep(found[i].__key);
      }
    }
  
    __deep(__key);
    return items;
  }

  const value = {
    version: '1.0.0',
    currentTab,
    menuBuilderData, setMenuBuilderData,
    menuToolTabData,
    currentEditMenuItem, setCurrentEditMenuItem,
    currentDragItem, setCurrentDragItem,
    groupItemDrag, setGroupItemDrag,
    onChangeCurrentTab_Fn,
    onUpdateBuilderData_Fn,
    onAddMenuItem_Fn,
    newMenuItem_Fn,
    onSelectEditMenuItem_Fn,
    getItemChildren_Fn,
  }

  return <MenuBuilderContext.Provider value={ value } >
    { children }
  </MenuBuilderContext.Provider>
}

export const useMenuBuilderContext = () => { 
  const value = useContext(MenuBuilderContext);
  return value;
}