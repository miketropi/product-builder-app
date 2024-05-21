function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener, false);
  // console.log('subscribe:', eventName)
}

function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener);
  // console.log('unsubscribe:', eventName)
}

function publish(eventName, data) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
  // console.log('publish: ', eventName)
}

export { publish, subscribe, unsubscribe }; 