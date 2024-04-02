import { useState, useEffect } from 'react';
import { useProductBuilderContext } from '../context/ProductBuilderContext';
import SelectProductModal from './SelectProductModal';
import {
  Page, BlockStack, Layout
} from "@shopify/polaris";
import { useFetcher, useSubmit } from "@remix-run/react";

export default function ProductBuilderApp() {
  const { version, actionData } = useProductBuilderContext();
  const [ modalAddProductDisplay, setModalAddProductDisplay ] = useState(false);
  const getProductSumit = useSubmit();

  return (<Page>
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
            const formData = new FormData();
            formData.append("productID", pID);
            formData.append("__action", "GET_PRODUCT_BY_ID");

            getProductSumit(formData, {
              // action: "",
              method: "post",
              // encType: "application/x-www-form-urlencoded",
              // preventScrollReset: false,
              // replace: false,
              relative: "route",
            });
          } }
        />
        { version }
        { JSON.stringify(actionData) }
        {
          actionData?.shopifyProduct &&
          JSON.stringify(actionData.shopifyProduct)
        }
      </Layout>
    </BlockStack>
  </Page>)
}