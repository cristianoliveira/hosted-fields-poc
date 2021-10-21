const HOSTED_FIELDS_URL = process.env.HOSTED_FIELDS_URL;

export function field({ element, input }) {
  const iframe = document.createElement('iframe');
  iframe.src = HOSTED_FIELDS_URL;
  iframe.name = input;

  return {
    element,
    iframe,
  };
}

export function onResult(callback) {
  window.addEventListener('message', (ev) => {
    const msg = ev.data;
    if (ev.origin === HOSTED_FIELDS_URL) {
      if (msg.action === 'on-result') {
        callback(msg);
      }
    }
  });
}

export const mount = (fields) => {
  let mainIframe;

  fields.forEach(({ element, iframe }) => {
    mainIframe = mainIframe || iframe;
    element.appendChild(iframe);
  });

  return {
    // mainIframe,
    submit: () => {
      mainIframe.contentWindow.postMessage(
        { action: 'submit' },
        HOSTED_FIELDS_URL
      );
      console.log('SUBMITED HOSTED FIELDS EVENT');
    },
  };
};
