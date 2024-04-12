(() => {
  'use strict'; 
  const ENDPOINT = 'https://shopify-dev.beplusprojects.com/api/';
  const ROOT_ELEM = document.querySelector('#__PRODUCT_BUILDER_APP__');
  const API_KEY = 'API-7fe65d4d3bbf95285235f51e4183207387b5169f';
  if(!ROOT_ELEM) return;
  alert('Hello world');
  const PID = ROOT_ELEM.dataset.productId;

  const getProductBuilderData = async () => {
    const res = await fetch(`${ ENDPOINT }content/item/product?filter={"product_id": "gid://shopify/Product/${ PID }"}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY
      }
    })
    const __json = await res.json();
    ROOT_ELEM.innerHTML = JSON.stringify(__json);
  }

  getProductBuilderData();

})(window)