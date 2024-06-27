import { FunnelEditContextProvider } from '../context/FunnelEditContext';
import { Page, Button, BlockStack, Layout } from "@shopify/polaris";
import Heading from '../components/menu-builder/Heading';
import { useLoaderData, useActionData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { useNavigate } from "@remix-run/react";
import { getStore } from "../libs/shopifyApi";
import Edit from '../components/funnel/Edit';
import ButtonSaveFunnel from '../components/funnel/ButtonSaveFunnel';

import appStyles from "../styles/app.css?url";
export const links = () => [
  { rel: "stylesheet", href: appStyles },
];

export const loader = async ({ params, request }) => {
  const { admin } = await authenticate.admin(request);
  const store = await getStore(admin.graphql);
  return { ...params, store }
} 

export default function() {
  const navigate = useNavigate();
  const { store, id } = useLoaderData();
  
  return <FunnelEditContextProvider store={ store } funnel_id={ id }>
    <Page>
      <Heading 
        backButtonEnable={ true } 
        backFn={ e => { navigate("/app/funnel") } } 
        title={ 'Funnel' } 
        buttons={ [
          <ButtonSaveFunnel />,
        ] } 
      />

      <div style={{ paddingTop: '2em' }}></div>

      <BlockStack gap="500">
        <Layout>
          <Layout.Section> 
            <Edit />
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  </FunnelEditContextProvider>
}