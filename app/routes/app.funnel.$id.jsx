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

  const url = new URL(request.url);
  const fcMode = url.searchParams.get("fc");

  console.log(fcMode);
  return { ...params, store, fcMode }
} 

export default function() {
  const navigate = useNavigate();
  const { store, id, fcMode } = useLoaderData();
  
  return <FunnelEditContextProvider store={ store } funnel_id={ id } fc_mode={ fcMode }>
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