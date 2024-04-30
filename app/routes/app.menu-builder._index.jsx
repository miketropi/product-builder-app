import { MenuBuilderContext_Provider } from "../context/MenuBuilderContext";
import { Page, Button } from "@shopify/polaris";
import Heading from '../components/menu-builder/Heading';

import appStyles from "../styles/app.css?url";
export const links = () => [
  { rel: "stylesheet", href: appStyles },
];

export default function MenuBuilder() {
  return <MenuBuilderContext_Provider>
    <Page>
      <Heading backButtonEnable={ false } title={ 'Menu Builder' } buttons={ [
        <Button variant="primary">Create Menu</Button>
      ] } />
    </Page>
  </MenuBuilderContext_Provider>  
}   