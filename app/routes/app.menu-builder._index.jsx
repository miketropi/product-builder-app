import { MenuBuilderListContext_Provider } from "../context/MenuBuilderListContext";
import { Page, Button, BlockStack, Layout } from "@shopify/polaris";
import { useLoaderData, useActionData } from "@remix-run/react";
import Heading from '../components/menu-builder/Heading';
import MenuBuilderTableList from "../components/menu-builder/v2/MenuBuilderTableList";
import { authenticate } from "../shopify.server";
import { getStore } from "../libs/shopifyApi";

import appStyles from "../styles/app.css?url";
export const links = () => [
  { rel: "stylesheet", href: appStyles },
];

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const store = await getStore(admin.graphql);
  return { store }
} 

export default function MenuBuilder() {
  const { store } = useLoaderData();

  return <MenuBuilderListContext_Provider store={ store }>
    <Page>
      <Heading backButtonEnable={ false } title={ 'Menu Builder' } buttons={ [
        <Button variant="primary" url={ '/app/menu-builder/new' }>Create Menu</Button>
      ] } />
      <div style={{ paddingTop: '2em' }}></div>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section> 
            <MenuBuilderTableList />
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  </MenuBuilderListContext_Provider>  
}   