import {
  Page, Button, Frame, Modal, TextContainer, BlockStack, Layout,
  LegacyCard,
  ResourceList,
  Avatar,
  ResourceItem,
  Text,
  FormLayout, TextField, 
  Icon,
  Thumbnail
} from "@shopify/polaris";
import { SearchIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import { useSubmit } from "@remix-run/react";
import { useOutletContext, useActionData, Form } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react"; 
import { authenticate } from "../shopify.server";
import { getProductsByKeyworld } from "../libs/shopifyApi";
import ListProducts from '../components/ListProducts';

import appStyles from "../styles/app.css?url";
export const links = () => [
  { rel: "stylesheet", href: appStyles },
];

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const __action = String(formData.get("__action"));

  switch (__action) {
    case 'SEARCH_SHOPIFY_PRODUCTS':
      const response = await getProductsByKeyworld(String(formData.get("search_text")), admin.graphql);
      return {
        shopifyProducts: response,
      }
      break;
  }

  return null;
}

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const response = await getProductsByKeyworld('blue', admin.graphql);
  
  return {
    shopifyProducts: response,
  };
}

export default function ProductBuilder() {
  const { APP_API_KEY, APP_API_ENDPOINT } = useOutletContext();
  // const { shopifyProducts }  = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  const [ text, setText ] = useState('Hello...!');
  const [ selectedItems, setSelectedItems ] = useState([]);

  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  return <Page>
    <ui-title-bar title="Product Builder">
      <button variant="primary" onClick={ e => { setActive(true) } }>
        New a Product Design Builder
      </button> 

      <Modal
        open={active}
        onClose={handleChange}
        title="Search and select a product"
        primaryAction={{
          content: 'OK',
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: 'Close',
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <FormLayout>
            <Form method="POST" onChange={(event) => {
                submit(event.currentTarget);
              }}
            >
              <TextField 
                prefix={ <Icon source={ SearchIcon } /> }
                label="Search Product" 
                type="text" 
                name="search_text" 
                value={ text } 
                onChange={ value => setText(value) } 
                autoComplete="off" />
              <input type="hidden" name="__action" value="SEARCH_SHOPIFY_PRODUCTS" />
            </Form>
          </FormLayout>
          {
            actionData?.shopifyProducts &&
            <ListProducts products={ actionData.shopifyProducts } />
          }
          
        </Modal.Section>
      </Modal>
      
    </ui-title-bar>
    <BlockStack gap="500">
      <Layout>
        <div className="__demo">Demo</div> dasdas
        { JSON.stringify(actionData?.shopifyProducts) }
      </Layout>
    </BlockStack>
  </Page>
}