import { useState, useEffect, Fragment } from 'react';
import { useProductBuilderContext } from '../context/ProductBuilderContext';
import SelectProductModal from './SelectProductModal';
import { useSubmit } from "@remix-run/react";
import EditBuilder from './EditBuilder';

import {
  Page, 
  BlockStack, 
  Layout, 
  Link,
  LegacyCard, 
  DataTable } from "@shopify/polaris";

export default function ProductBuilderApp() {
  const { version, loadData, actionData, productsBuilderList } = useProductBuilderContext();
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
              <Layout.Section>
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
                {
                  // JSON.stringify(productsBuilderList)
                }
                <LegacyCard>
                  <DataTable 
                    columnContentTypes={[
                      'text',
                      'text',
                      'text',
                    ]}
                    headings={[
                      'Store ID',
                      'Product ID',
                      'Status'
                    ]}
                    rows={ productsBuilderList.map((__p) => {
                      const { store_id, product_id, status } = __p; 
                      const RootDomain = `https://admin.shopify.com/store/devmegamenu/apps/product-builder-app-2/app/product-builder`;
                      return [store_id, <Link
                        removeUnderline
                        url={ `?__product=${ product_id.replace('gid://shopify/Product/', '') }&__view=product-builder` }              
                      >
                        { product_id }
                      </Link>, status ? 'Published' : ''];
                    }) }
                  />
                </LegacyCard>
              </Layout.Section>
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