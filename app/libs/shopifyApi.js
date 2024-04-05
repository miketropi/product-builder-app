export const getStore = async (graphql) => {
  const response = await graphql(`
  #graphql
  query shopInfo {
    shop {
      id
      name
      url
      myshopifyDomain
      plan {
        displayName
        partnerDevelopment
        shopifyPlus
      }
    }
  }
  `)

  return await response.json().then(({ data }) => {
    return data?.shop
  });
}

export const getProductsByKeyworld = async (searchText, graphql) => {
  const response = await graphql(`
  #graphql
  query Products($searchText: String) {
    products(first: 50, query: $searchText) {
      edges {
        node {
          id
          title
          description
          variants(first:250) {
            edges {
              node {
                id
                title
                price
                image {
                  url
                }
              }
            }
          }
          images(first:1) {
            nodes {
              id
              url
            }
          }
        }
      }
    }
  }`, 
  {
    variables: { 
      searchText
    },
  });

  return await response.json().then(({ data }) => {
    return data?.products?.edges
  });
}

export const getProductByID = async (productID, graphql) => {
  const response = await graphql(`
  #graphql
  query ProductByID($productID: ID!) {
    product(id: $productID){
      id
      title
      description
      variants(first:250) {
        edges {
          node {
            id
            title
            displayName
            price
            contextualPricing(context: {country: US}) {
              price {
                amount
                currencyCode
              }
            }
            image {
              url
            }
          }
        }
      }
      images(first:1) {
        nodes {
          id
          url
        }
      }
    }
  }`, 
  {
    variables: { 
      productID
    },
  });

  return await response.json().then(({ data }) => {
    return data?.product
  });
}

export const getFiles = async (searchText = '', graphql) => {
  const response = await graphql(`
  #graphql
  query getFiles($searchText: String) {
    files(first:20, query: $searchText) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      nodes {
        __typename
        alt
        createdAt
        id 
        preview {
          image {
            url
          }
        }
      } 	  
    }
  }
  `, {
    variables: { 
      searchText
    },
  })

  return await response.json().then(({ data }) => {
    return data?.files
  });
}