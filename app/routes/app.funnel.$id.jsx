import { FunnelEditContextProvider } from '../context/FunnelEditContext';
import { Page, Button, BlockStack, Layout } from "@shopify/polaris";
import Heading from '../components/menu-builder/Heading';
import { useLoaderData, useActionData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { useNavigate } from "@remix-run/react";
import Edit from '../components/funnel/Edit';

import appStyles from "../styles/app.css?url";
export const links = () => [
  { rel: "stylesheet", href: appStyles },
];

export const loader = async ({ params, request }) => {
  const { admin } = await authenticate.admin(request);
  return { ...params }
} 

export default function() {
  const navigate = useNavigate();
  const { id } = useLoaderData();
  
  return <FunnelEditContextProvider>
    <Page>
      <Heading 
        backButtonEnable={ true } 
        backFn={ e => { navigate("/app/funnel") } } 
        title={ 'Funnel' } 
        buttons={ [<Button variant="primary" url={ '#' }>Save</Button>] } 
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