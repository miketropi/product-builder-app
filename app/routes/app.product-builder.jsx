import { useState, useEffect }  from 'react';
import { ProductBuilderContext_Provider } from "../context/ProductBuilderContext";
import ProductBuilderApp from "../components/ProductBuilderApp";
import { useLoaderData, useActionData } from "@remix-run/react"; 
import { getProductsByKeyworld, getProductByID } from "../libs/shopifyApi";
import { authenticate } from "../shopify.server";
import { redirect } from "@remix-run/node";


import appStyles from "../styles/app.css?url";
export const links = () => [
  { rel: "stylesheet", href: appStyles },
];

export const loader = async ({ request }) => {
  // console.log(request);
  const url = new URL(request.url);
  const productID = url.searchParams.get("__product");
  const view = url.searchParams.get("__view");
  
  let returnData = {};
  returnData = { ...returnData, view, productID };

  if(view == 'product-builder' && productID) {
    const { admin } = await authenticate.admin(request);
    const res = await getProductByID(String(`gid://shopify/Product/${ productID }`), admin.graphql);
    returnData = { ...returnData, productObject: res };
  }

  const { admin } = await authenticate.admin(request);
  return returnData

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
      // console.log(formData);
      redirect(`?__product=${ String(formData.get("productID")) }`);
      return { shopifyProduct: res, __action }
      break;
  }

  return res;
}

export default function ProductBuilder() {
  const [ _actionData, set_actionData ] = useState({});
  const loadData  = useLoaderData();
  const actionData = useActionData();

  useEffect(() => {
    set_actionData(actionData);
  }, [actionData])

  return (<ProductBuilderContext_Provider loadData={ loadData } actionData={ actionData } >
    <ProductBuilderApp />
  </ProductBuilderContext_Provider>)
}