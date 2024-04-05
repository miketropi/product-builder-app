import { useState, useEffect, Fragment, useCallback } from 'react';
import {
  Page, BlockStack, Layout, FullscreenBar, Text, ButtonGroup, Button
} from "@shopify/polaris";
import { useNavigate } from "@remix-run/react";
import VariantItem from './edit-components/VariantItem';
import VariantConfigBox from './edit-components/VariantConfigBox';
import { useProductBuilderContext } from '../context/ProductBuilderContext';
import { useAppBridge, } from '@shopify/app-bridge-react';

export default function EditBuilder({ productObject, editItem }) {
  const shopify = useAppBridge();
  const navigate = useNavigate();
  const { API_FA, __getProductsBuilderData } = useProductBuilderContext();
  const [ builderData, setBuilderData ] = useState([]);
  const [ editItemID, setEditItemID ] = useState('');
  const [ editObject, setEditObject ] = useState();
  const [ _productBuilderEditID, set_productBuilderEditID ] = useState('');

  useEffect(() => {
    // setEditItemID(editItem);
    // console.log(editObject);
    if(!editObject) return; 

    let __builderData = [...builderData];
    let __index = __builderData.findIndex(i => { return i.id == editItemID })
    __builderData[__index] = { ...editObject };

    setBuilderData(__builderData);
  }, [editObject])

  const __getProductBySID = async(ID, callback) => {
    try{
      const res = await API_FA.current.getProductBuilderBySID(ID);
      callback(res)
    } catch(err) {
      console.log(err);
      callback('')
    }
  }

  useEffect(() => {
    if(!productObject?.variants) return;
    __getProductBySID(productObject?.id, (res) => {
      
      if(res) {
        // console.log('aaaaa', res)
        const { _id, builder_design_data } = res;
        setBuilderData(builder_design_data);
        set_productBuilderEditID(_id);
        setEditItemID(editItem);
        return;
      }

      setBuilderData([...productObject.variants.edges].map(({ node }) => {
        node.builderData = {
          __config: {
            enable: true,
          },
          __options: []
        }
        return node;
      }));

      setEditItemID(editItem);
    })
  }, [productObject])

  useEffect(() => {
    if(!editItemID) return;
    let __builderData = [...builderData];
    setEditObject(__builderData.find(i => { return i.id == editItemID }));
  }, [editItemID])

  const onSave = async () => {
    console.log('onSave called');
    // console.log(productObject);
    // console.log(builderData);
    const { id } = productObject;
    const pushData = {
      "status": true,
      // "store_id": "", auto push on API
      "product_id": id,
      "builder_design_data": builderData,
    }

    if(_productBuilderEditID) {
      pushData._id = _productBuilderEditID;
    }

    const res = await API_FA.current.saveProducrBuilderData(pushData);
    console.log(res);
    shopify.toast.show('Save Successful!');
  }

  const onBackScreen = useCallback(() => {
    // shopify.toast.show('Success!');
    __getProductsBuilderData(); // reload data
    navigate("/app/product-builder")
  }, [])

  const onAddConfigBox = useCallback(() => {
    let __editObject = {...editObject};
    __editObject.builderData.__options.push(
      {
        __key: `__` + (Math.random() + 1).toString(36).substring(7),
        name: 'Option name',
        type: 'options', // options, addon
        description: '',
        options: [
          {
            __key: `__` + (Math.random() + 1).toString(36).substring(7),
            name: '',
            image: '',
          }
        ]
      }
    )

    setEditObject(__editObject)
  }, [editObject])

  const fullscreenBarMarkup = (
    <FullscreenBar onAction={ onBackScreen }>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <div style={{marginLeft: '1rem', flexGrow: 1}}>
          <Text variant="headingLg" as="p">
            { `Product: ${ productObject?.title }` }
          </Text>
        </div>
        <ButtonGroup>
          <Button variant="primary" onClick={ e => onSave() }>
            Save
          </Button>
        </ButtonGroup>
      </div>
    </FullscreenBar>
  )

  return <Page>
    { fullscreenBarMarkup } 
    <BlockStack>
      <Layout>
        <Layout.Section>
          <div className="edit-container">
            <div className="variants-list">
              {
                productObject.variants.edges.map(({ node }) => {
                  const { id } = node;
                  return <VariantItem 
                    key={ id } 
                    variant={ node } 
                    active={ id == editItemID ? true : false }
                    onSelect={ ({ id }) => {
                    setEditItemID(id);
                  } } />
                })
              }
            </div>
            <div className="config-container">
              {/* { _productBuilderEditID } */}
              {/* { JSON.stringify(editObject) } */}
              {/* { JSON.stringify(builderData) } */}
              {
                editObject &&
                <>
                  <VariantConfigBox variant={ editObject } onChange={ data => {
                    // console.log(data);
                    setEditObject(prevState => {
                      // console.log(prevState);
                      return {...prevState, builderData: data }
                    })
                    // setEditObject({ ...editObject, __options: data.__options })
                    } } 
                  />
                  <button className="pb-add-button" onClick={ onAddConfigBox }>
                    + Add More Config Box
                  </button>
                </>
              }
            </div>
          </div>
        </Layout.Section>
      </Layout>
    </BlockStack>
  </Page>
}