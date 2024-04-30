import { createContext, useContext, useState, useEffect } from "react";

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

const MenuBuilderContext = createContext(null);
const MenuBuilderContext_Provider = ({ children }) => {

  const value = {
    version: '1.0.0',
    menuBuilderData: __MENU_BUILDER_DATA,
  }

  return <MenuBuilderContext.Provider value={ value } >
    { children }
  </MenuBuilderContext.Provider>
}

const useMenuBuilderContext = () => {
  return useContext(MenuBuilderContext);
}

export { MenuBuilderContext_Provider, useMenuBuilderContext }