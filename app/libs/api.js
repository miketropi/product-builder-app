export default class ApiForApp {

  __APP_API_KEY = '';
  __APP_API_ENDPOINT = '';

  constructor(APP_API_KEY, APP_API_ENDPOINT) {
    this.__APP_API_KEY = APP_API_KEY;
    this.__APP_API_ENDPOINT = APP_API_ENDPOINT;

    return this;
  }

  async __request(__url, data, method) {
    const self = this;
    const response = await fetch(self.__APP_API_ENDPOINT + __url, {
      method,
      cache: "no-cache", 
      headers: {
        "Content-Type": "application/json",
        'api-key': self.__APP_API_KEY
      },
      body: JSON.stringify(data), 
    });
    console.log(response);
    return response.json();
  }

  async getProductsBuilderData() {
    const res = await this.__request('/content/items/product');
    return res;
  }
}