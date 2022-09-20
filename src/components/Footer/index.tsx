import {
  Box,
  Container,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

const Footer = () => {
  const bgColor = useColorModeValue(`white`, `gray.700`);

  return (
    <Box py="4" bgColor={bgColor} w="full">
      <Container maxW="6xl">
        <Text align="center" fontSize="sm">
          developed by{' '}
          <Link href="https://me.luancode.dev.br/" isExternal>
            luancode
          </Link>
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
