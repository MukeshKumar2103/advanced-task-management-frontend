import constants from '@/constants';

const { colors } = constants;

const { defaultThemeValues } = colors;

export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

function setThemeColors(hex: string): void {
  const root = document.documentElement;
  const rgb = hexToRgb(hex);

  const defaultValue = defaultThemeValues[hex];

  const themeColors: {
    [key: string]: string | { r: number; g: number; b: number };
  } = {
    '--theme-main-color': hex,
    '--theme-main-color-rgb': `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    '--theme-main-color-dark': defaultValue?.dark,
    '--theme-main-color-light': defaultValue?.light,
  };

  // Loop through each color and set it as a CSS variable on the root
  for (const [key, value] of Object.entries(themeColors)) {
    root.style.setProperty(key, value.toString());
  }
}

export default { hexToRgb, setThemeColors };
