const HOSTED_FIELDS_URL = process.env.HOSTED_FIELDS_URL;

const getHostedFields = (siblingIframes) => {
  const hostedFields = [];
  for (let i = 0, len = siblingIframes.length; i < len; i++) {
    const frame = siblingIframes[i];
    try {
      if (frame.origin === HOSTED_FIELDS_URL) {
        // console.log('@@@@@@ NAME frame.name: ', frame.name);
        // console.log('@@@@@@ SAME_ORIGIN frame.origin: ', frame.origin);
        hostedFields.push(frame);
      }
    } catch (e) {
      console.warn('WARNING: blocked access to frame', frame);
    }
  }

  return hostedFields;
};

const message = (win, message, origin) => {
  win.postMessage(message, origin);
};

const submit = () => {
  const hfields = getHostedFields(window.parent.frames || window.top.frames);
  const payload = hfields
    .map((hs) => {
      const input = hs.document.querySelector('input');
      return {
        name: hs.name,
        value: input.value,
      };
    })
    .reduce((acc, inp) => ({ ...acc, [inp.name]: inp.value }), {});

  console.log('PAYLOAD TO POST: ', payload);
  // mocked sensitive data removal
  payload['credit-card-number'] = '****';
  message(window.parent, { action: 'on-result', value: payload }, '*');
};

const listenMessages = () => {
  window.addEventListener('message', (ev) => {
    const { action } = ev.data || {};
    switch (action) {
      case 'submit':
        submit();
        break;

      default:
        console.log('UNHANDLED MESSAGE data: ', ev.data);
    }
  });
};

export function init() {
  listenMessages();
  const hfields = getHostedFields(window.parent.frames || window.top.frames);
  hfields.forEach((hf) =>
    message(hf, { action: 'init', value: 'none' }, HOSTED_FIELDS_URL)
  );
  console.log('HOSTED FIELD INIT');
}
