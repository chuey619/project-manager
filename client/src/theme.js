import { theme } from '@chakra-ui/core';

const breakpoints = ['360px', '768px', '1024px', '1440px'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  fonts: {
    body: 'Kanit, sans-serif',
    heading: 'Kanit, sans-serif',
    mono: 'Kanit, sans-serif',
  },
  colors: {
    ...theme.colors,
    brand: {
      900: '#FF6B6C',
      800: '#5B5F97',
      700: '#FFC145',
    },
  },
  breakpoints,
};

export default customTheme;
