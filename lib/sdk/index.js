export function create({ element, input }) {
  const iframe = document.createElement('iframe');
  iframe.src = 'http://localhost:9000';
  iframe.name = input;

  element.appendChild(iframe);
}
