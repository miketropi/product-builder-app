import { createContext, useContext, useState, useEffect } from 'react';
import { menuDataInit } from '../data/menuDataInit';
import { deepSearch } from '../libs/helpers';

const MenuBuilderContextV2 = createContext(null);

const MenuBuilderContextV2_Provider = ({ children }) => {
  const [menuData, setMenuData] = useState(menuDataInit);
  const [currentItemEdit, setCurrentItemEdit] = useState(null);
  const [showAllSub, setShowAllSub] = useState(null);

  const value = {
    menuData, setMenuData,
    currentItemEdit, setCurrentItemEdit,
    showAllSub, setShowAllSub,
  }

  return <MenuBuilderContextV2.Provider value={ value }>
    { children }
  </MenuBuilderContextV2.Provider>
}

const useMenuBuilderContextV2 = () => {
  return useContext(MenuBuilderContextV2);
}

export { MenuBuilderContextV2_Provider, useMenuBuilderContextV2 }