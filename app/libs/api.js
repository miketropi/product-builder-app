export default class ApiForApp {

  __STORE_ID = ''
  __APP_API_KEY = '';
  __APP_API_ENDPOINT = '';

  constructor(STORE_ID, APP_API_KEY, APP_API_ENDPOINT) {
    this.__STORE_ID = STORE_ID;
    this.__APP_API_KEY = APP_API_KEY;
    this.__APP_API_ENDPOINT = APP_API_ENDPOINT;

    return this;
  }

  async __request(__url, data, method) {
    const self = this;
    const response = await fetch(`${ self.__APP_API_ENDPOINT }${ __url }`, {
      method,
      cache: "no-cache", 
      headers: {
        "Content-Type": "application/json",
        'api-key': self.__APP_API_KEY
      },
      body: JSON.stringify(data), 
    });

    return response.json();
  }

  async getProductsBuilderData(limit = 20, paged = 0) {
    const res = await this.__request(`/content/items/product?limit=${ limit }&skip=0&filter={"store_id": "${ this.__STORE_ID }"}`);
    return res;
  }

  async getProductBuilderBySID(ShopifyProductID) {
    if(!ShopifyProductID) return '';
    try {
      const res = await this.__request(`/content/item/product?filter={"product_id": "${ ShopifyProductID }","store_id": "${ this.__STORE_ID }"}`);
      return res;
    } catch(err) {
      return false
    }
  }

  async saveProducrBuilderData(data) {
    data.store_id = this.__STORE_ID; // push store id 
    const res = await this.__request('/content/item/product', {
      data
    }, 'POST');
    return res;
  }

  async deleteProduct(productID) {
    const res = await this.__request(`/content/item/product/${ productID }`, {}, 'DELETE');
    return res;
  }
}