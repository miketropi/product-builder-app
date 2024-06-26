import { Fragment } from "react";
import { useLoaderData, useActionData } from "@remix-run/react";
import { Page, Button } from "@shopify/polaris";
import { getStore } from "../libs/shopifyApi";
import { authenticate } from "../shopify.server";
import Heading from '../components/menu-builder/Heading';
import { MenuBuilderContextV2_Provider } from "../context/MenuBuilderContextV2";
import MenuBuilderEditorV2 from "../components/menu-builder/v2/MenuBuilderEditorV2";
import MenuHeaderEdit from "../components/menu-builder/v2/MenuHeaderEdit";

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
      <MenuBuilderContextV2_Provider store={ store } menu_id={ id }>
        <Page fullWidth>
          <MenuHeaderEdit menu_id={ id } />
          <div className="menu-builder-edit__container">
            <MenuBuilderEditorV2 />
          </div> 
        </Page> 
      </MenuBuilderContextV2_Provider>
    }
  </>
}   