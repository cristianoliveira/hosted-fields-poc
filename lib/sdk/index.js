const HOSTED_FIELDS_URL = 'http://localhost:9000';

var hfframes = [];
export function create({ element, input }) {
  const iframe = document.createElement('iframe');
  iframe.src = HOSTED_FIELDS_URL;
  iframe.name = input;

  element.appendChild(iframe);
  hfframes.push(iframe);

  return iframe;
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

export function submit() {
  const [mainIframe] = hfframes;
  mainIframe.contentWindow.postMessage({ action: 'submit' }, HOSTED_FIELDS_URL);
  console.log('SUBMITED HOSTED FIELDS EVENT');
}
