import { extendTheme } from '@chakra-ui/react';

const initialColorMode = `dark`;

const colors = {
  gunmetal: `#292F36`,
  mediumTurquoise: `#4ECDC4`,
  mintCream: `#F7FFF7`,
  bittersweet: `#FF6B6B`,
  yellowCrayola: `#FFE66D`,
};

const fonts = {
  heading: `'PT Mono', monospace`,
  body: `'Comfortaa', cursive`,
};

const theme = extendTheme({ initialColorMode, colors, fonts });

export default theme;
