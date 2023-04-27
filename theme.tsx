import { extendTheme } from '@chakra-ui/react';

export const colors = {
  white: '#ffffff',
  darkBlue: '#0000ff',
  lightBlue: '#02f6fb',
};

export const fonts = {
  heading: 'Helvetica',
  body: 'Roboto',
  fontWeigth: '700',
};

export const fontSizes = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  md: '0.9375rem', // 15px
  lg: '1rem', // 16px
  xl: '1.0625rem', // 17px
  '2xl': '1.25rem', // 20px
  '3xl': '1.5625rem', // 25px
  '4xl': '2.125rem', // 34px
  '5xl': '2.1875rem', // 35px
  '6xl': '6.25rem', // 100px
  '7xl': '9.375rem', // 150px
  '8xl': '12.5rem', // 200px
  '9xl': '16.25rem', // 260px
};

const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  styles: {
    global: () => ({
      body: {
        bg: '#73C6B6',
      },
    }),
  },
});

export default theme;
