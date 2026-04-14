import { Page, Button, BlockStack, Layout } from "@shopify/polaris";
import Heading from '../components/Heading';
import { useLoaderData, useActionData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { getStore } from "../libs/shopifyApi";
import { FunnelContextProvider } from "../context/FunnelContext"; 
import FunnelIndex from "../components/funnel/FunnelIndex";

import appStyles from "../styles/app.css?url";
export const links = () => [
  { rel: "stylesheet", href: appStyles },
];

export const loader = async ({ params, request }) => {
  const { admin } = await authenticate.admin(request);
  const store = await getStore(admin.graphql);
  return { store }
}

export default function() {
  const { store } = useLoaderData();

  return <FunnelContextProvider store={ store }>
    <Page>
      <Heading backButtonEnable={ false } title={ 'Funnel' } buttons={ [
        <Button variant="primary" url={ '/app/funnel/new' }>Create Funnel</Button>
      ] } />

      <div style={{ paddingTop: '2em' }}></div>
      <FunnelIndex />
    </Page>
  </FunnelContextProvider>
}