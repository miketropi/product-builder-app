import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import FunnelProxyApiHelper from "../libs/FunnelProxyApiHelper";

const __QUERY_WITH_COLLECTION = `query ProductFilterFunnel($collectionHandle: String!, $filters: [ProductFilter!]) {
  collection(handle: $collectionHandle) {
    handle
    id
    products(first:10, filters: $filters) {
      edges {
        node {
          handle 
          title 
          productType
          vendor
          tags
        }
      }
    }
  }  
}`;

const __QUERY_NOT_COLLECTION = `query ProductFilterFunnel($query: String!) {
  products(first:10, query: $query) {
    edges {
      node {
        handle 
        title 
        productType
        vendor
        tags
      }
    }
  } 
}`;

const buildQueryFunnelFilter = async (dataFilters, __graphql) => {
  const { collectionHandle, filters } = dataFilters;

  // with Collection
  if(collectionHandle && collectionHandle != '') {
    return await __graphql(__QUERY_WITH_COLLECTION, { variables: dataFilters });
  }
  
  // Without Collection
  let $query = filters.length 
    ? filters.map((f) => {
        return `${ Object.keys(f)[0] }:${ Object.values(f)[0] }`;
      }).join(' ')
    : ''; 

  return await __graphql(__QUERY_NOT_COLLECTION, { variables: {
    query: $query
  } });
}

export async function action({ request }) {
  console.log(`------------- Hit app proxy 1 ----------------`);
  // const data = await request.formData()
  const { admin, session, storefront } = await authenticate.public.appProxy(request);
  const data = await request.json();
  const { proccess, args } = data;
  
  switch(proccess) {
    case 'funnel':
      const F = new FunnelProxyApiHelper(storefront.graphql);
      const { task, data } = args;
      const res = F[task](data); 
      return res; 
      break;

    default: 
      return `Proccess not defined...!`;
      break
  }

  return; 
  const { collectionHandle, filters } = data;
  // console.log(data); 
  // const { admin, session, storefront } = await authenticate.public.appProxy(request);
  const res = await buildQueryFunnelFilter(data, storefront.graphql);
  return json(await res.json());  
  
  const response = await storefront.graphql(`query ProductFilterFunnel($collectionHandle: String!, $filters: [ProductFilter!]) {
      collection(handle: $collectionHandle) {
        handle
        id
        products(first:10, filters: $filters) {
          edges {
            node {
              handle 
              title 
              productType
              vendor
              tags
            }
          }
        }
      }  
    }`, {
      variables: {
        collectionHandle: collectionHandle,
        filters: filters, 
      }
    }
  );

  return json(await response.json());  
}