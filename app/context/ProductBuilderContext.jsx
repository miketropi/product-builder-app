import { createContext, useContext, useState, useEffect, useRef } from "react"; 
import { useOutletContext } from "@remix-run/react";
import ApiForApp from "../libs/api";

const ProductBuilderContext = createContext(null);

const ProductBuilderContext_Provider = ({ children, actionData }) => {
  const { APP_API_KEY, APP_API_ENDPOINT } = useOutletContext();
  const API_FA = useRef(null);

  /**
   * State
   */
  const [ productCurrentID, setProductCurrentID ] = useState('');
  const [ productCurrentObject, setProductCurrentObject ] = useState({})

  const __getProductsBuilderData = async () => {
    const res = await API_FA.current.getProductsBuilderData();
    console.log(res);
  }

  useEffect(() => {
    API_FA.current = new ApiForApp(APP_API_KEY, APP_API_ENDPOINT);
    __getProductsBuilderData();
  }, [])

  const value = {
    version: '1.0.0',
    API_FA,
    actionData,
    productCurrentID, setProductCurrentID,
    productCurrentObject, setProductCurrentObject
  }

  return <ProductBuilderContext.Provider value={ value } >
    { children } 
  </ProductBuilderContext.Provider>
}

const useProductBuilderContext = () => {
  return useContext(ProductBuilderContext)
}

export { ProductBuilderContext_Provider, useProductBuilderContext }