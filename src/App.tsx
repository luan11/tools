import { Flex, ChakraProvider } from '@chakra-ui/react';

import theme from './ui/themes/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex minHeight="100vh" direction="column">
      <Header />
      <Home />
      <Footer />
    </Flex>
  </ChakraProvider>
);
