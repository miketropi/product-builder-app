import { createContext, useContext, useState, useEffect, useRef } from "react"; 
import { useOutletContext } from "@remix-run/react";
import ApiForApp from "../libs/api";

const ProductBuilderContext = createContext(null);

const ProductBuilderContext_Provider = ({ children, loadData, actionData }) => {
  const { APP_API_KEY, APP_API_ENDPOINT } = useOutletContext();
  const [ productsBuilderList, setProductsBuilderList ] = useState([]);
  const [ total, setTotal ] = useState(0);
  const API_FA = useRef(null);

  /**
   * State
   */
  const [ productCurrentID, setProductCurrentID ] = useState('');
  const [ productCurrentObject, setProductCurrentObject ] = useState({})

  const __getProductsBuilderData = async () => {
    console.log('___Get Data___')
    const { data, meta: { total } } = await API_FA.current.getProductsBuilderData();
    setProductsBuilderList(data);
    setTotal(total)
  }

  useEffect(() => {
    API_FA.current = new ApiForApp(loadData?.store?.id, APP_API_KEY, APP_API_ENDPOINT);
    __getProductsBuilderData();
  }, [])

  const value = {
    version: '1.0.0',
    API_FA,
    loadData, 
    actionData,
    productsBuilderList, 
    total,
    productCurrentID, setProductCurrentID,
    productCurrentObject, setProductCurrentObject,
    __getProductsBuilderData
  }

  return <ProductBuilderContext.Provider value={ value } >
    { children } 
  </ProductBuilderContext.Provider>
}

const useProductBuilderContext = () => {
  return useContext(ProductBuilderContext)
}

export { ProductBuilderContext_Provider, useProductBuilderContext }