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

  async getProductsBuilderData(paged = 1, limit = 20) {
    let skip = (paged - 1) * limit;
    const res = await this.__request(`/content/items/product?limit=${ limit }&skip=${ skip }&filter={"store_id": "${ this.__STORE_ID }"}`);
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

  /**
   * Menu Builder API
   */
  async saveMenuBuilder(data) {
    data.store_id = this.__STORE_ID; // push store id 
    const res = await this.__request('/content/item/menubuilder', {
      data
    }, 'POST');
    return res;
  }

  async loadMenuBuilderById(menuID) {
    try {
      const res = await this.__request(`/content/item/menubuilder/${ menuID }`);
      return res;
    } catch(err) {
      return false
    }
  }

  async getMenuBuilderList(paged = 1, limit = 20) {
    let skip = (paged - 1) * limit;
    const res = await this.__request(`/content/items/menubuilder?limit=${ limit }&skip=${ skip }&filter={"store_id": "${ this.__STORE_ID }"}`);
    return res;
  }

  async deleteMenuItem(menuID) {
    const res = await this.__request(`/content/item/menubuilder/${ menuID }`, {}, 'DELETE');
    return res;
  }
  /**
   * End Menu Builder API
   */

  /**
   * Funnel
   */
  async saveFunnel(data) {
    data.store_id = this.__STORE_ID; // push store id 
    const res = await this.__request('/content/item/funnel', {
      data
    }, 'POST');
    return res;
  }

  async getFunnelById(funnelID) {
    try {
      const res = await this.__request(`/content/item/funnel/${ funnelID }`);
      return res;
    } catch(err) {
      return false
    }
  }
  /**
   * End Funnel
   */
}