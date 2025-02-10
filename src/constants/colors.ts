interface ThemeValues {
  dark: string;
  light: string;
  colorClassName: string;
}

const defaultThemeValues: { [key: string]: ThemeValues } = {
  '#7f77f1': {
    dark: '#5c52ed',
    light: '#ecebfd',
    colorClassName: 'ut-purple',
  },
  '#1090e0': {
    dark: '#0d77ba',
    light: '#7ac6f5',
    colorClassName: 'ut-azureBlue',
  },
  '#ee5e99': {
    dark: '#ea3982',
    light: '#fad1e2',
    colorClassName: 'ut-pink',
  },
  '#b660e0': {
    dark: '#a63ed9',
    light: '#e7cbf5',
    colorClassName: 'ut-violet',
  },
  '#6985ff': {
    dark: '#4064ff',
    light: '#e8edff',
    colorClassName: 'ut-neonBlue',
  },
  '#e16b16': {
    dark: '#bc5912',
    light: '#f3b284',
    colorClassName: 'ut-orange',
  },
  '#0f9d9f': {
    dark: '#0b787a',
    light: '#40ebed',
    colorClassName: 'ut-teal',
  },
  '#aa8d80': {
    dark: '#9a7768',
    light: '#ddd2cc',
    colorClassName: 'ut-brown',
  },
  '#595d66': {
    dark: '#464950',
    light: '#999da6',
    colorClassName: 'ut-black',
  },
  '#3db88b': {
    dark: '#339974',
    light: '#98ddc3',
    colorClassName: 'ut-mint',
  },
};

export default { defaultThemeValues };
