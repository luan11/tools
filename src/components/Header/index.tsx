import {
  useColorModeValue,
  Box,
  Container,
  Flex,
  VStack,
  Text,
  Heading,
  HStack,
} from '@chakra-ui/react';

import ColorModeSwitcher from './../ColorModeSwitcher';
import Search from './../Search';

const Header = () => {
  const bgColor = useColorModeValue(``, `gray.700`);
  const boxShadow = useColorModeValue(`lg`, `md`);
  const headingColor = useColorModeValue(`gunmetal`, `mintCream`);

  return (
    <Box
      py="4"
      bgColor={bgColor}
      boxShadow={boxShadow}
      position="fixed"
      w="full"
      zIndex={1}
      top={0}
      left={0}
    >
      <Container maxW="6xl">
        <Flex justify="space-between">
          <VStack>
            <Text size="sm" fontWeight="semibold">
              luancode
            </Text>
            <Heading
              as="h1"
              size="sm"
              color={headingColor}
              sx={{ mt: `0 !important` }}
            >
              tools
            </Heading>
          </VStack>
          <HStack>
            <Search />
            <ColorModeSwitcher />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
