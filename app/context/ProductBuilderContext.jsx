import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react"; 
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

  /**
   * Media Modal
   */
  const [ mediaActive, setMediaActive ] = useState(false);
  const [ mediaSelected, setMediaSelected ] = useState([]);
  const onSelectMedia_Fn = useRef(null);
  const mediaPicker = async (callback) => {
    setMediaActive(true);
    onSelectMedia_Fn.current = callback;
  }

  const onLoadMedia_Fn = async (searchText) => {
    console.log(`onLoadMedia_Fn`)
    const res = await fetch('shopify:admin/api/graphql.json', {
      method: 'POST',
      body: JSON.stringify({
        query: `
        query getFiles($searchText: String) {
          files(first:20, query: $searchText) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                ... on MediaImage {
                  id
                  createdAt
                  mimeType
                  originalSource {
                    fileSize
                  }
                  image {
                    id
                    originalSrc: url
                    width
                    height
                  }
                }
              }
            }
          }
        }
        `,
        variables: { searchText },
      }),
    });
    
    return await res.json();
  }

  const [ editProduct_data, setEditProduct_data ] = useState([]);
  const [ editProduct_ID_Update, setEditProduct_ID_Update ] = useState();
  const [ editProduct__editObject, setEditProduct__editObject ] = useState({});

  const optTemp_Fn = () => {
    return {
      __key: `__` + (Math.random() + 1).toString(36).substring(7),
      name: 'Option name',
      type: 'options', // options, addon
      description: '',
      addons: [
        {
          __key: `__` + (Math.random() + 1).toString(36).substring(7),
          name: '',
          products: [],
        }
      ],
      options: [
        {
          __key: `__` + (Math.random() + 1).toString(36).substring(7),
          name: '',
          image: '',
        }
      ]
    }
  }

  const editProduct__editDataReset_Fn = () => {
    setEditProduct_data([]);
    setEditProduct_ID_Update('');
    setEditProduct__editObject({})
  }

  const editProduct__editDataSetup_Fn = async (shopifyProductObject) => {
    const res = await API_FA.current.getProductBuilderBySID(shopifyProductObject?.id);
    let editData = [];
    // console.log(res);
    // console.log(shopifyProductObject.variants.edges);
    if(res) {
      setEditProduct_ID_Update(res?._id);
      editData = [...shopifyProductObject.variants.edges].map(({ node }) => {
        let builderData = { __config: { enable: true, }, __options: [] };
        const foundIndex = res.builder_design_data.findIndex(rItem => rItem.id == node.id);
        
        // found
        if(foundIndex !== -1) { 
          builderData = res.builder_design_data[foundIndex]?.builderData
        }

        return { ...node, builderData };
      })
    } else {
      editData = [...shopifyProductObject.variants.edges].map(({ node }) => {
        const builderData = { __config: { enable: true, }, __options: [] };
        return { ...node, builderData };
      })
    }
    
    setEditProduct_data([...editData]);
    setEditProduct__editObject(editData[0]);
  }

  const editProduct__onUpdateCurrentObject_Fn = useCallback((obj) => {
    setEditProduct__editObject(obj)
  })

  const editProduct__onAddConfigBox_Fn = useCallback(() => {
    let __editProduct__editObject = { ...editProduct__editObject };
    __editProduct__editObject.builderData.__options.push(optTemp_Fn());
    setEditProduct__editObject(__editProduct__editObject);
  })

  const editProduct__onSave_Fn = useCallback(async ({ id, title }) => {
    // const { id, title } = editProduct_data;
    const pushData = {
      "status": true,
      // "store_id": "", auto push on API
      "product_name": title,
      "product_id": id,
      "builder_design_data": editProduct_data,
    }

    if(editProduct_ID_Update) {
      pushData._id = editProduct_ID_Update;
    }

    const res = await API_FA.current.saveProducrBuilderData(pushData);
    if(res?._id) {
      setEditProduct_ID_Update(res._id);  
    }
    return res;
  })

  const editProduct__onImport_Fn = (importData) => {
    // editProduct_data, setEditProduct_data

    // const {__config, __options} = importData;
    
    // console.log(importData);
    let __editObject = { ...editProduct__editObject, builderData: importData }
    // editProduct__editObject.builderData.__config = __config
    // editProduct__editObject.builderData.__options = __options
    let __editProduct_data = [...editProduct_data];
    let __index = [...editProduct_data].findIndex(i => i.id == editProduct__editObject.id);
    __editProduct_data[__index] = __editObject;
    setEditProduct_data(__editProduct_data)
    setEditProduct__editObject(__editProduct_data[__index]);
  }

  const value = {
    version: '1.0.0',
    API_FA,
    loadData, 
    actionData,
    productsBuilderList, 
    total,
    productCurrentID, setProductCurrentID,
    productCurrentObject, setProductCurrentObject,
    editProduct: {
      editProduct__editDataReset_Fn,
      onSave: editProduct__onSave_Fn,
      initSetup: editProduct__editDataSetup_Fn,
      editProduct_data, setEditProduct_data,
      editProduct_ID_Update, setEditProduct_ID_Update,
      editProduct__onUpdateCurrentObject_Fn,
      editProduct__onAddConfigBox_Fn,
      editProduct__editObject, setEditProduct__editObject,
      editProduct__onImport_Fn
    },
    mediaModal: {
      mediaActive, setMediaActive,
      mediaSelected, setMediaSelected,
      mediaPicker,
      onSelectMedia_Fn,
      onLoadMedia_Fn
    },
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