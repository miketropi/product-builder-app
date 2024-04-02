import { useState, useEffect }  from 'react';
import { ProductBuilderContext_Provider } from "../context/ProductBuilderContext";
import ProductBuilderApp from "../components/ProductBuilderApp";
import { useLoaderData, useActionData } from "@remix-run/react"; 
import { getProductsByKeyworld, getProductByID } from "../libs/shopifyApi";
import { authenticate } from "../shopify.server";

import appStyles from "../styles/app.css?url";
export const links = () => [
  { rel: "stylesheet", href: appStyles },
];

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  return {
    _: ''
  }

  // const response = await getProductsByKeyworld('blue', admin.graphql);
  // return { shopifyProducts: response, };
}

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData(); 
  const __action = String(formData.get("__action"));
  let res = null;
  // console.log(formData);
  switch (__action) {
    case 'SEARCH_SHOPIFY_PRODUCTS':
      res = await getProductsByKeyworld(String(formData.get("search_text")), admin.graphql);
      return { shopifyProducts: res, __action }
      break;

    case 'GET_PRODUCT_BY_ID':
      // console.log(String(formData.get("productID")))
      res = await getProductByID(String(formData.get("productID")), admin.graphql);
      console.log(formData);
      return { shopifyProduct: res, __action }
      break;
  }

  return res;
}

export default function ProductBuilder() {
  const [ _actionData, set_actionData ] = useState({});
  const { _ }  = useLoaderData();
  const actionData = useActionData();

  useEffect(() => {
    console.log(actionData);
    set_actionData(actionData);
  }, [actionData])

  return (<ProductBuilderContext_Provider actionData={ actionData } >
    <ProductBuilderApp />
  </ProductBuilderContext_Provider>)
}