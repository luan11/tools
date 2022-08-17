import {
  useColorModeValue,
  Box,
  Container,
  Flex,
  HStack,
  VStack,
  Text,
  Heading,
} from '@chakra-ui/react';

import { ReactComponent as LuancodeIconLight } from './../../images/luancode-icon.svg';
import { ReactComponent as LuancodeIconDark } from './../../images/luancode-icon-dark.svg';
import ColorModeSwitcher from './../ColorModeSwitcher';

const Header = () => {
  const LuancodeIcon = useColorModeValue(LuancodeIconLight, LuancodeIconDark);

  const bgColor = useColorModeValue(``, `gray.700`);
  const boxShadow = useColorModeValue(`lg`, `md`);
  const headingColor = useColorModeValue(`gunmetal`, `mintCream`);

  return (
    <Box py="4" bgColor={bgColor} boxShadow={boxShadow}>
      <Container maxW="6xl">
        <Flex justify="space-between">
          <HStack align="center">
            <Box w="16">
              <LuancodeIcon />
            </Box>
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
          </HStack>
          <ColorModeSwitcher />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
