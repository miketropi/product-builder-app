export default class ProductBuilderProxyApiHelper {
  __graphql = null

  constructor(graphql) {
    this.__graphql = graphql;
  }

  async getProductVariantByID(productVariantID) {
    const res = await this.__graphql(`
      {
        node(id: "${productVariantID}") {
          ... on ProductVariant { 
            id
            title
            sku
            price {
              amount
              currencyCode
            }
            image {
              id
              url
            }
            availableForSale
          }
        } 
      }
      `)

    const { data } = await res.json();
    return data?.node;
  }
}