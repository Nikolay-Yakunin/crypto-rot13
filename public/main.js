import { cryptRot13, decryptRot13 } from '../src/rot13/rot13.js';

const textarea = document.getElementById('textInput');
const radios = Array.from(document.getElementsByName('mode'));
const output = document.getElementById('textOutput');

let timeoutId = null;
const DEBOUNCE_DELAY = 300;

function update() {
  const text = textarea.value;
  const mode = radios.find(r => r.checked).value;

  const result = mode === 'encrypt'
    ? cryptRot13(text)
    : decryptRot13(text);

  output.textContent = result;
}

function scheduleUpdate() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(update, DEBOUNCE_DELAY);
}

textarea.addEventListener('input', scheduleUpdate);
radios.forEach(r => r.addEventListener('change', scheduleUpdate));

document.querySelectorAll('textarea').forEach(el => {
  el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
  el.classList.add('auto');
  el.addEventListener('input', e => {
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight) + 'px';
  });
});

function copyText() {
  const text = document.getElementById("textOutput").innerText;
  navigator.clipboard.writeText(text).then(() => {
    console.log("Текст скопирован!");
  }).catch(err => {
    console.error("Ошибка копирования:", err);
  });
}

document.getElementById("textOutput").addEventListener("click", copyText);

document.addEventListener('DOMContentLoaded', update);