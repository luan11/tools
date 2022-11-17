import {
  Flex,
  ChakraProvider,
  Box,
  Container,
  Divider,
} from '@chakra-ui/react';
import { Router } from '@reach/router';

import theme from './ui/themes/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Readme from './pages/Readme';
import NotFound from './pages/NotFound';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex minHeight="100vh" direction="column">
      <Header />
      <Box mt={{ base: 131, sm: 75 }} py={8} flexGrow={1}>
        <Container maxW="6xl">
          <Divider mb={8} />
          <Router>
            <NotFound default />
            <Home path="/" />
            <Readme path="readme/:slug" />
          </Router>
        </Container>
      </Box>
      <Footer />
    </Flex>
  </ChakraProvider>
);
