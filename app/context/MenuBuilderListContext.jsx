import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useOutletContext } from "@remix-run/react";
import ApiForApp from "../libs/api";

const MenuBuilderListContext = createContext(null);

const MenuBuilderListContext_Provider = ({ children, store }) => {
  const { APP_API_KEY, APP_API_ENDPOINT } = useOutletContext();
  const API_FA = useRef(null);

  const [menuItems, setMenuItems] = useState([]);

  const loadData = async () => {
    const res = await API_FA.current.getMenuBuilderList();
    if(!res) {
      alert('ERROR: ???')
      return;
    }
    
    const { data, meta } = res;
    setMenuItems(data);
  }

  useEffect(() => {
    API_FA.current = new ApiForApp(store?.id, APP_API_KEY, APP_API_ENDPOINT);
    loadData();
  }, [])

  const DeleteMenuItem_Fn = async (menuID) => {
    // deleteMenuItem
    const res = await API_FA.current.deleteMenuItem(menuID);
    console.log(res);    
    loadData();
  }

  const value = {
    menuItems, setMenuItems,
    DeleteMenuItem_Fn,
  }

  return <MenuBuilderListContext.Provider value={ value }>
    { children }
  </MenuBuilderListContext.Provider>
}

const useMenuBuilderListContext = () => {
  return useContext(MenuBuilderListContext)
}

export { MenuBuilderListContext_Provider, useMenuBuilderListContext }