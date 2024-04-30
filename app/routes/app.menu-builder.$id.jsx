import { MenuBuilderContext_Provider } from "../context/MenuBuilderContext";
import { useLoaderData, useActionData } from "@remix-run/react";
import { Page, Button } from "@shopify/polaris";
import Heading from '../components/menu-builder/Heading';
import ToolBar from "../components/menu-builder/Toolbar";
import MenuBuilderEditor from "../components/menu-builder/MenuBuilderEditor";

import appStyles from "../styles/app.css?url";
export const links = () => [
  { rel: "stylesheet", href: appStyles },
];

export const loader = async ({ params, request }) => {
  // const { admin } = await authenticate.admin(request);
  // console.log(params)
  return params
}

export default function MenuBuilder() {
  const { id } = useLoaderData();

  return <MenuBuilderContext_Provider>
    <Page fullWidth>
      <Heading 
        backButtonEnable={ true }
        title={ 'Menu Builder' } 
        backFn={ e => {
          console.log('back...!')
        } } 
        buttons={ [
          <Button variant="primary">{
            id == 'new' ? 'Create Menu' : 'Update'
          }</Button>
        ] } 
      />
      <div className="menu-builder-edit__container">
        <ToolBar />
        <MenuBuilderEditor />
      </div>
    </Page>
  </MenuBuilderContext_Provider>  
}   