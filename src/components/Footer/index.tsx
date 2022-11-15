import {
  Box,
  Container,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

const Footer = () => {
  const bgColor = useColorModeValue(`white`, `gray.700`);
  const borderColor = useColorModeValue(`gray.50`, `gray.600`);

  return (
    <Box
      py="4"
      bgColor={bgColor}
      w="full"
      borderTop="4px"
      borderColor={borderColor}
    >
      <Container maxW="6xl">
        <Text align="center" fontSize="sm">
          developed by{' '}
          <Link href="https://me.luancode.dev.br/" isExternal>
            luancode
          </Link>
          {` `}| checkout the{` `}
          <Link href="https://github.com/luan11/tools" isExternal>
            repository
          </Link>
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
