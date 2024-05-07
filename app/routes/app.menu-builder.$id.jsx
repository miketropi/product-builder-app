import { Fragment } from "react";
import MenuBuilderContext_Provider from "../context/MenuBuilderContext";
import { useLoaderData, useActionData } from "@remix-run/react";
import { Page, Button } from "@shopify/polaris";
import { getStore } from "../libs/shopifyApi";
import { authenticate } from "../shopify.server";
import Heading from '../components/menu-builder/Heading';
import ToolBar from "../components/menu-builder/Toolbar";
import MenuBuilderEditor from "../components/menu-builder/MenuBuilderEditor";

import { MenuBuilderContextV2_Provider } from "../context/MenuBuilderContextV2";
import MenuBuilderEditorV2 from "../components/menu-builder/v2/MenuBuilderEditorV2";

import appStyles from "../styles/app.css?url";
export const links = () => [
  { rel: "stylesheet", href: appStyles },
];

export const loader = async ({ params, request }) => {
  const { admin } = await authenticate.admin(request);
  const store = await getStore(admin.graphql);

  return { ...params, store }
}

export default function MenuBuilder() {
  const { id, store } = useLoaderData();

  return <>
    {
      store && 
      <MenuBuilderContextV2_Provider store={ store } id={ id }>
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
            <MenuBuilderEditorV2 />
          </div> 
        </Page> 
      </MenuBuilderContextV2_Provider>
    }
  </>

  return <>
    {
      store &&
      <MenuBuilderContext_Provider store={ store }>
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
            {/* <ToolBar />
            <MenuBuilderEditor /> */}
          </div> 
        </Page> 
      </MenuBuilderContext_Provider>
    }
  </>  
}   