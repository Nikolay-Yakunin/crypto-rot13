import { alphabetEngLower, alphabetEngUpper, alphabetRuLower, alphabetRuUpper } from "./data.js"

const alphabets = [
  { set: alphabetEngUpper, shift: 13 },
  { set: alphabetEngLower, shift: 13 },
  { set: alphabetRuUpper, shift: 13 },
  { set: alphabetRuLower, shift: 13 }
];

function shiftChar(alphabet, ch, shift) {
  for (let i = 0; i < alphabet.length; i++) {
    if (alphabet[i] === ch) {
      const len = alphabet.length;
      const newIdx = (i + shift % len + len) % len;
      return alphabet[newIdx];
    }
  }
  return ch;
}

export function cryptRot13(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += cryptChar(text[i]);
  }
  return result;
}

export function cryptChar(ch) {
  for (const { set, shift } of alphabets) {
    const res = shiftChar(set, ch, shift);
    if (res !== ch) return res;
  }
  return ch;
}

export function decryptRot13(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += decryptChar(text[i]);
  }
  return result;
}

export function decryptChar(ch) {
  for (const { set, shift } of alphabets) {
    const res = shiftChar(set, ch, -shift);
    if (res !== ch) return res;
  }
  return ch;
}
