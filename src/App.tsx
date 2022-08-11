import { Box, ChakraProvider } from '@chakra-ui/react';

import theme from './ui/themes/theme';
import Home from './pages/Home';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Home />
  </ChakraProvider>
);
