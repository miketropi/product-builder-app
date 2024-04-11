import { useState, useEffect, Fragment, useCallback } from 'react';
import { useProductBuilderContext } from '../context/ProductBuilderContext';
import VariantItem from './edit-components/VariantItem';
import VariantConfigBox from './edit-components/VariantConfigBox';
import { useNavigate } from "@remix-run/react";
import { useAppBridge } from '@shopify/app-bridge-react';
import {
  Page, 
  BlockStack, 
  Layout, FullscreenBar, 
  Text, 
  ButtonGroup, 
  Button, 
  Badge
} from "@shopify/polaris";

export default function EditBuilderV2({ ShopifyProductObject }) {
  const shopify = useAppBridge();
  const navigate = useNavigate();
  const { 
    editProduct, 
    __getProductsBuilderData } = useProductBuilderContext();
  const { 
    editProduct__editDataReset_Fn,
    onSave, 
    initSetup, 
    editProduct_data, 
    editProduct_ID_Update,
    editProduct__onUpdateCurrentObject_Fn,
    editProduct__onAddConfigBox_Fn,
    editProduct__editObject } = editProduct;

  /**
   * Initial
   */
  useEffect(() => {
    initSetup(ShopifyProductObject)

    return () => {
      editProduct__editDataReset_Fn();
    }
  }, [])

  const onBackScreen = () => {
    __getProductsBuilderData(); // reload data
    navigate("/app/product-builder")
  }

  const __onSave = async () => {
    shopify.loading(true);
    const res = await onSave(ShopifyProductObject)
    shopify.loading(false);
    shopify.toast.show('Save Successful!');
  }

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
            { `Product: ${ ShopifyProductObject?.title }` } ({ ShopifyProductObject?.id.replace('gid://shopify/Product/', '') }) 
            <span style={{ marginLeft: '.5em' }}>
              <Badge 
                tone={ editProduct_ID_Update ? 'attention' : 'success' }
              >
                { editProduct_ID_Update ? 'Edit' : 'New' }
              </Badge>
            </span>
          </Text>
        </div>
        <ButtonGroup>
          <Button variant="primary" onClick={ e => __onSave() }>
            { editProduct_ID_Update ? 'Update Product' : 'Create Product' }
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
          {/* { JSON.stringify(editProduct__editObject) }
          <br />
          ________________________________________________________________
          <br />
          { JSON.stringify(editProduct_data) } */}
          {
            editProduct_data && 
            <div className="edit-container">
              <div className="variants-list">
                <div className="__sticky">
                  {
                    editProduct_data.map((item) => {
                      return <VariantItem 
                        key={ item.id } 
                        variant={ item } 
                        active={ item.id == editProduct__editObject?.id ? true : false }
                        onSelect={ v => editProduct__onUpdateCurrentObject_Fn(v) } />
                    })
                  }
                </div>
              </div>
              <div className="config-container">
                {
                  editProduct__editObject && 
                  <>
                    <VariantConfigBox 
                      variant={ editProduct__editObject } 
                      onChange={ data => {
                        console.log(data);
                        editProduct__onUpdateCurrentObject_Fn(prevState => {
                          return { ...prevState, builderData: data }
                        })
                      } } 
                    />
                    <button className="pb-add-button" onClick={ editProduct__onAddConfigBox_Fn }>
                      + Add More Config Box
                    </button>
                  </>
                }
              </div>
            </div>
          }
        </Layout.Section>
      </Layout>
    </BlockStack>
  </Page>
}