import { cryptRot13, decryptRot13 } from './rot13/rot13.js';

const DEBOUNCE_DELAY = 300;

function setupAutoResize(el) {
  el.classList.add('auto');
  const adjust = () => {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  };
  el.addEventListener('input', adjust);
  adjust();
}


function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function updateOutput() {
  const textarea = document.getElementById('textInput');
  const radios   = Array.from(document.getElementsByName('mode'));
  const output   = document.getElementById('textOutput');

  const text = textarea.value;
  const mode = radios.find(r => r.checked).value;
  output.textContent = mode === 'encrypt'
    ? cryptRot13(text)
    : decryptRot13(text);
}

function setupCopy() {
  const output = document.getElementById('textOutput');
  output.addEventListener('click', () => {
    navigator.clipboard.writeText(output.textContent)
      .then(() => console.log('Текст скопирован!'))
      .catch(err => console.error('Ошибка копирования:', err));
  });
}

export default function initApp() {
  const textarea = document.getElementById('textInput');
  const radios   = Array.from(document.getElementsByName('mode'));

  setupAutoResize(textarea);
  setupCopy();

  const debouncedUpdate = debounce(updateOutput, DEBOUNCE_DELAY);

  textarea.addEventListener('input', debouncedUpdate);
  radios.forEach(r => r.addEventListener('change', debouncedUpdate));

  updateOutput();
}
