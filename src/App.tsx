import { Box, ChakraProvider } from '@chakra-ui/react';

import theme from './ui/themes/theme';
import Header from './components/Header';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box>
      <Header />
    </Box>
  </ChakraProvider>
);
