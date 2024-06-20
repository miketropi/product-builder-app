import { Page, Button, BlockStack, Layout } from "@shopify/polaris";
import Heading from '../components/menu-builder/Heading';

import appStyles from "../styles/app.css?url";
export const links = () => [
  { rel: "stylesheet", href: appStyles },
];

export default function() {
  return <Page>
    <Heading backButtonEnable={ false } title={ 'Funnel' } buttons={ [
      <Button variant="primary" url={ '/app/funnel/new' }>Create Funnel</Button>
    ] } />

    <div style={{ paddingTop: '2em' }}></div>
    <BlockStack gap="500">
      <Layout>
        <Layout.Section> 
          Hello...!
        </Layout.Section>
      </Layout>
    </BlockStack>
  </Page>
}