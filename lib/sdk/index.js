const HOSTED_FIELDS_URL = 'http://localhost:9000';

let hfields = [];
export function create({ element, input }) {
  const iframe = document.createElement('iframe');
  iframe.src = HOSTED_FIELDS_URL;
  iframe.name = input;

  element.appendChild(iframe);
  hfields.push(iframe);
}

export function submit() {
  const iframe = hfields[0];
  debugger;
  iframe.contentWindow.postMessage({ action: 'submit' }, HOSTED_FIELDS_URL);
  console.log('SUBMITED HOSTED FIELDS EVENT');
}
