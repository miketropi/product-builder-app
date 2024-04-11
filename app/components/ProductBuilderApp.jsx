import { useState, useEffect, Fragment } from 'react';
import { useProductBuilderContext } from '../context/ProductBuilderContext';
import { useSubmit, useNavigate } from "@remix-run/react";
import EditBuilder from './EditBuilder';
import EditBuilderV2 from './EditBuilderV2';
import PbTable from './PbTable';
import { useAppBridge, } from '@shopify/app-bridge-react';
import { DeleteIcon } from '@shopify/polaris-icons';

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
  Banner,
  DataTable } from "@shopify/polaris";

export default function ProductBuilderApp() {
  const shopify = useAppBridge();
  const navigation = useNavigate();
  const { 
    version, 
    loadData, 
    actionData, 
    productsBuilderList, 
    API_FA, 
    __getProductsBuilderData } = useProductBuilderContext();

  const switchViews = {
    'product-builder': () => {
      return <EditBuilderV2 ShopifyProductObject={ loadData.productObject } />
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
          <div style={{ paddingTop: '2em' }}></div>
          <BlockStack gap="500">
            <Layout>
              <Layout.Section>
                {
                  productsBuilderList.length == 0 &&
                  <Banner title="No item..." onDismiss={() => {}}>
                    <p>Please click the button "Select a Product Builder" to start.</p>
                  </Banner>
                }
                {
                  productsBuilderList.length > 0 && 
                  <LegacyCard>
                    <PbTable 
                      headings={[
                        '',
                        'Product Name',
                        'Status',
                        ''
                      ]}
                      rows={ productsBuilderList.map((__p, __p_index) => {
                        const { _id, store_id, product_id, product_name, status } = __p; 
                        return [
                          `#${ __p_index + 1 }`, 
                          <>
                            { product_name } { ' ' }
                            <Link
                              removeUnderline
                              url={ `?__product=${ product_id.replace('gid://shopify/Product/', '') }&__view=product-builder` }              
                            > [Edit]</Link>
                            <div><small>{ product_id }</small></div>
                          </>, 
                          (status ? 'Published' : ''), 
                          <>
                            <Button 
                              variant="primary" 
                              tone="critical" 
                              icon={ DeleteIcon }
                              onClick={ async e => {
                                console.log(_id);
                                let r = confirm(`Are you sure you want to delete?`);
                                if(!r) return;

                                shopify.loading(true);
                                let res = await API_FA.current.deleteProduct(_id);
                                console.log(res);
                                await __getProductsBuilderData();
                                shopify.loading(false);
                                shopify.toast.show(`Deleted item successfully.`);
                            } }>Delete</Button>
                          </>
                        ];
                      }) }
                    />
                  </LegacyCard>
                }
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