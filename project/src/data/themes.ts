export interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default Light',
    colors: {
      background: '#ffffff',
      text: '#2d3748',
      primary: '#3182ce',
      secondary: '#4a5568',
      accent: '#ed64a6',
    },
  },
  {
    id: 'dark',
    name: 'Default Dark',
    colors: {
      background: '#1a202c',
      text: '#f7fafc',
      primary: '#63b3ed',
      secondary: '#a0aec0',
      accent: '#f687b3',
    },
  },
  {
    id: 'nord',
    name: 'Nord',
    colors: {
      background: '#2e3440',
      text: '#eceff4',
      primary: '#88c0d0',
      secondary: '#81a1c1',
      accent: '#b48ead',
    },
  },
  {
    id: 'solarized-light',
    name: 'Solarized Light',
    colors: {
      background: '#fdf6e3',
      text: '#657b83',
      primary: '#268bd2',
      secondary: '#586e75',
      accent: '#d33682',
    },
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    colors: {
      background: '#002b36',
      text: '#839496',
      primary: '#268bd2',
      secondary: '#93a1a1',
      accent: '#d33682',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    colors: {
      background: '#282a36',
      text: '#f8f8f2',
      primary: '#bd93f9',
      secondary: '#6272a4',
      accent: '#ff79c6',
    },
  },
  {
    id: 'monokai',
    name: 'Monokai',
    colors: {
      background: '#272822',
      text: '#f8f8f2',
      primary: '#a6e22e',
      secondary: '#75715e',
      accent: '#f92672',
    },
  },
  {
    id: 'github-light',
    name: 'GitHub Light',
    colors: {
      background: '#ffffff',
      text: '#24292e',
      primary: '#0366d6',
      secondary: '#586069',
      accent: '#ea4aaa',
    },
  },
  {
    id: 'github-dark',
    name: 'GitHub Dark',
    colors: {
      background: '#0d1117',
      text: '#c9d1d9',
      primary: '#58a6ff',
      secondary: '#8b949e',
      accent: '#ec6cb9',
    },
  },
  {
    id: 'gruvbox-light',
    name: 'Gruvbox Light',
    colors: {
      background: '#fbf1c7',
      text: '#3c3836',
      primary: '#076678',
      secondary: '#665c54',
      accent: '#9d0006',
    },
  },
  {
    id: 'gruvbox-dark',
    name: 'Gruvbox Dark',
    colors: {
      background: '#282828',
      text: '#ebdbb2',
      primary: '#83a598',
      secondary: '#928374',
      accent: '#fb4934',
    },
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    colors: {
      background: '#1a1b26',
      text: '#a9b1d6',
      primary: '#7aa2f7',
      secondary: '#787c99',
      accent: '#bb9af7',
    },
  },
  {
    id: 'material-light',
    name: 'Material Light',
    colors: {
      background: '#fafafa',
      text: '#37474f',
      primary: '#2196f3',
      secondary: '#607d8b',
      accent: '#e91e63',
    },
  },
  {
    id: 'material-dark',
    name: 'Material Dark',
    colors: {
      background: '#263238',
      text: '#eceff1',
      primary: '#82aaff',
      secondary: '#78909c',
      accent: '#f07178',
    },
  },
  {
    id: 'ayu-light',
    name: 'Ayu Light',
    colors: {
      background: '#fafafa',
      text: '#5c6773',
      primary: '#55b4d4',
      secondary: '#959da6',
      accent: '#f07171',
    },
  },
  {
    id: 'ayu-dark',
    name: 'Ayu Dark',
    colors: {
      background: '#0a0e14',
      text: '#b3b1ad',
      primary: '#39bae6',
      secondary: '#626772',
      accent: '#f07178',
    },
  },
  {
    id: 'one-light',
    name: 'One Light',
    colors: {
      background: '#fafafa',
      text: '#383a42',
      primary: '#4078f2',
      secondary: '#696c77',
      accent: '#e45649',
    },
  },
  {
    id: 'one-dark',
    name: 'One Dark',
    colors: {
      background: '#282c34',
      text: '#abb2bf',
      primary: '#61afef',
      secondary: '#5c6370',
      accent: '#e06c75',
    },
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin',
    colors: {
      background: '#1e1e2e',
      text: '#cdd6f4',
      primary: '#89b4fa',
      secondary: '#a6adc8',
      accent: '#f5c2e7',
    },
  },
  {
    id: 'rose-pine',
    name: 'Rosé Pine',
    colors: {
      background: '#191724',
      text: '#e0def4',
      primary: '#9ccfd8',
      secondary: '#6e6a86',
      accent: '#eb6f92',
    },
  }
]; 