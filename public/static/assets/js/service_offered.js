const baseColors = [
  "#d9ead1", "#d5e7cc", "#d0e3c6", "#cbdfc0", "#c6dcbb", "#c2d9b7",
  "#bdd6b1", "#bcd5b0", "#bbd4af", "#b7d1aa", "#b3cea5", "#a3c391", "#95ad85"
];

// HEX to HSL conversion
function hexToHSL(hex) {
  let r = parseInt(hex.substr(1,2),16) / 255;
  let g = parseInt(hex.substr(3,2),16) / 255;
  let b = parseInt(hex.substr(5,2),16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if(max === min){
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

// HSL to HEX conversion
function hslToHex(h, s, l){
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c/2;
  let [r, g, b] =
    h < 60 ? [c, x, 0] :
    h < 120 ? [x, c, 0] :
    h < 180 ? [0, c, x] :
    h < 240 ? [0, x, c] :
    h < 300 ? [x, 0, c] : [c, 0, x];

  const toHex = n => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Generate color based on index (i can be 0, 1, 2, ...)
function generateColor(i) {
  const hslPalette = baseColors.map(hexToHSL);

  // Always stay within valid index range
  const maxIndex = hslPalette.length - 2;
  const baseIndex = Math.floor(i) % maxIndex;
  const t = i - Math.floor(i); // fractional part (0–1)

  const current = hslPalette[baseIndex];
  const next = hslPalette[baseIndex + 1];

  // Safety check to avoid undefined
  if (!current || !next) return "#cccccc";

  const [h1, s1, l1] = current;
  const [h2, s2, l2] = next;

  const h = h1 + (h2 - h1) * t;
  const s = s1 + (s2 - s1) * t;
  const l = l1 + (l2 - l1) * t;

  return hslToHex(h, s, l);
}

// Example: apply colors to accordion sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".accordion-section");

  sections.forEach((section, i) => {
    const color = generateColor(i);
    section.style.backgroundColor = color;
  });
});
