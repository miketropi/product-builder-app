import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"; 
import { useOutletContext } from "@remix-run/react";
import ApiForApp from "../libs/api";

const FunnelContext = createContext(null);

const FunnelContextProvider = ({ children, store }) => {
  const { APP_API_KEY, APP_API_ENDPOINT } = useOutletContext();
  const [ funnelItems, setFunnelItems ] = useState([]);
  const [ funnelMeta, setFunnelMeta ] = useState({});
  const [ currentPage, setCurrentPage ] = useState(1);
  const API_FA = useRef(null);
  
  const onInit = async () => {
    await onLoadFunnels(currentPage);
  }

  const onLoadFunnels = async (_currentPage) => {
    const { data, meta } = await API_FA.current.getFunnelList(_currentPage); 
    // console.log(data, meta);
    if(data) { setFunnelItems(data); }
    if(meta) { setFunnelMeta(meta); }
  }

  useEffect(() => {
    API_FA.current = new ApiForApp(store?.id, APP_API_KEY, APP_API_ENDPOINT);
    onInit();
  }, [])

  useEffect(() => {
    onLoadFunnels(currentPage)
  }, [currentPage])

  const onDeleteItem = async (id) => {
    await API_FA.current.deleteFunnel(id);
    onInit();
  }

  const onUpdatePaged = (num) => {
    setCurrentPage(num);
  }

  const value = {
    funnelItems, setFunnelItems,
    funnelMeta, setFunnelMeta, 
    currentPage, setCurrentPage, 
    fn: {
      onDeleteItem,
      onUpdatePaged,
    }
  }

  return <FunnelContext.Provider value={ value }>
    { children }
  </FunnelContext.Provider>
}

const useFunnelContext = () => {
  return useContext(FunnelContext);
}

export { FunnelContextProvider, useFunnelContext }