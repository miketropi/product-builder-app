import { useState, useEffect, Fragment } from 'react';
import { useProductBuilderContext } from '../context/ProductBuilderContext';
import SelectProductModal from './SelectProductModal';
import {
  Page, BlockStack, Layout
} from "@shopify/polaris";
import { useSubmit } from "@remix-run/react";
import EditBuilder from './EditBuilder';

export default function ProductBuilderApp() {
  const { version, loadData, actionData } = useProductBuilderContext();
  const [ modalAddProductDisplay, setModalAddProductDisplay ] = useState(false);
  const getProductSumit = useSubmit();

  const switchViews = {
    'product-builder': () => {
      let firstVariantID = loadData?.productObject?.variants.edges[0].node.id
      return <EditBuilder 
        productObject={ loadData.productObject } 
        editItem={ firstVariantID } />
    },
    '': () => {
      return (
        <Page>
          <ui-title-bar title="Product Builder">
            <button variant="primary" onClick={ e => { setModalAddProductDisplay(true) } }>
              Add a Product Builder
            </button>  
          </ui-title-bar>
          <BlockStack gap="500">
            <Layout>
              <SelectProductModal 
                open={ modalAddProductDisplay } 
                onClose={ e => setModalAddProductDisplay(false) } 
                onHandle={ (pID) => {
                  setModalAddProductDisplay(false);
                  getProductSumit({}, { 
                    action: `?__product=${ pID.replace('gid://shopify/Product/', '') }&__view=product-builder`,
                    method: "post",
                  });
                } }
              />
              123
              { JSON.stringify(loadData) }
              { JSON.stringify(actionData) }
              {
                actionData?.shopifyProduct &&
                JSON.stringify(actionData.shopifyProduct)
              }
            </Layout>
          </BlockStack>
        </Page>
      )
    }
  }

  return <Fragment>
    {
      (() => {
        let __view = loadData?.view ? loadData.view : '';
        return switchViews[__view]()
      })()
    }
  </Fragment>
}