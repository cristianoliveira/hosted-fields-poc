const HOSTED_FIELDS_URL = 'http://localhost:9000';

const getHostedFields = (siblingIframes) => {
  console.log('siblingIframes: ', siblingIframes);
  const hostedFields = [];
  for (let i = 0, len = siblingIframes.length; i < len; i++) {
    const frame = siblingIframes[i];
    try {
      if (frame.origin === HOSTED_FIELDS_URL) {
        console.log('@@@@@@ NAME frame.name: ', frame.name);
        console.log('@@@@@@ SAME_ORIGIN frame.origin: ', frame.origin);
        hostedFields.push(frame);
      }
    } catch (e) {
      console.error('Failed for ', e, frame);
    }
  }

  return hostedFields;
};

const broadcast = (win, message, origin) => {
  win.postMessage(message, origin);
};

const submit = () => {
  const hfields = getHostedFields(window.parent.frames || window.top.frames);
  console.log('@@@@@@ hfields: ', hfields);
  const payload = hfields
    .map((hs) => {
      const input = hs.document.querySelector('input');
      console.log('@@@@@@ input: ', input);
      return {
        name: hs.name,
        value: input.value,
      };
    })
    .reduce((acc, inp) => ({ ...acc, [inp.name]: inp.value }), {});

  console.log('payload to submit: ', payload);
};

const listenMessages = () => {
  window.addEventListener('message', (ev) => {
    const { action } = ev.data || {};
    switch (action) {
      case 'submit':
        submit();
        break;

      default:
        console.log('@@@@@@ ev.data: ', ev.data);
    }
  });
};

export function init() {
  listenMessages();
  const hfields = getHostedFields(window.parent.frames || window.top.frames);
  hfields.forEach((hf) =>
    broadcast(hf, { action: 'init', value: 'none' }, HOSTED_FIELDS_URL)
  );
  console.log('HOSTED FIELD INIT');
}
