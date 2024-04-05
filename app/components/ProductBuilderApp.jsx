import { useState, useEffect, Fragment } from 'react';
import { useProductBuilderContext } from '../context/ProductBuilderContext';
import { useSubmit, useNavigate } from "@remix-run/react";
import EditBuilder from './EditBuilder';
import PbTable from './PbTable';
import { useAppBridge, } from '@shopify/app-bridge-react';

import {
  Page, 
  BlockStack, 
  Layout, 
  Link,
  LegacyCard, 
  ButtonGroup,
  Button,
  FullscreenBar,
  Text,
  DataTable } from "@shopify/polaris";

export default function ProductBuilderApp() {
  const shopify = useAppBridge();
  const navigation = useNavigate();
  const { version, loadData, actionData, productsBuilderList, __getProductsBuilderData } = useProductBuilderContext();

  const switchViews = {
    'product-builder': () => {
      let firstVariantID = loadData?.productObject?.variants.edges[0].node.id
      return <EditBuilder 
        productObject={ loadData.productObject } 
        editItem={ firstVariantID } />
    },
    '': () => {
      
      const fullscreenBarMarkup = (
        <div className="__hide-back-button">
          <FullscreenBar>
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
                  { `Product Builder` }
                </Text>
              </div>
              <ButtonGroup>
                <Button variant="primary" onClick={ async e => {
                  const selected = await shopify.resourcePicker({type: 'product', showVariants: false});
                  if(!selected) return;

                  let [ first ] = selected;
                  let __id = first.id.replace('gid://shopify/Product/', '')
                  navigation(`/app/product-builder?__product=${ __id }&__view=product-builder`);
                } }>
                  Select a Product Builder
                </Button>
              </ButtonGroup>
            </div>
          </FullscreenBar>
        </div>
      )

      return (
        <Page>
          { fullscreenBarMarkup }
          {/* <ui-title-bar title="Product Builder">
            <button variant="primary" onClick={ async e => {
              const selected = await shopify.resourcePicker({type: 'product', showVariants: false});
              let [ first ] = selected;
              let __id = first.id.replace('gid://shopify/Product/', '')
              navigation(`/app/product-builder?__product=${ __id }&__view=product-builder`);
            } }>
              Select a Product Builder
            </button>  
          </ui-title-bar> */}
          <div style={{ paddingTop: '2em' }}></div>
          <BlockStack gap="500">
            <Layout>
              <Layout.Section>
                {
                  // JSON.stringify(productsBuilderList)
                }
                <LegacyCard>
                  <PbTable 
                    headings={[
                      '',
                      'Product ID',
                      'Status',
                      'Actions'
                    ]}
                    rows={ productsBuilderList.map((__p, __p_index) => {
                      const { store_id, product_id, status } = __p; 
                      return [`#${ __p_index + 1 }`, <>
                        { product_id } { ' ' }
                        <Link
                          removeUnderline
                          url={ `?__product=${ product_id.replace('gid://shopify/Product/', '') }&__view=product-builder` }              
                        >
                          [Edit]
                        </Link>
                      </>, (status ? 'Published' : ''), '...'];
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
        return <div id="PRODUCT_BUILDER_CONTAINER">
          { switchViews[__view]() }
        </div>
      })()
    }
  </Fragment>
}