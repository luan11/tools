import {
  useColorModeValue,
  Box,
  Container,
  Flex,
  HStack,
  Heading,
} from '@chakra-ui/react';

import { ReactComponent as LuancodeIcon } from './../../images/luancode-icon.svg';
import ColorModeSwitcher from './../ColorModeSwitcher';

const Header = () => {
  const bgColor = useColorModeValue(``, `gray.700`);
  const boxShadow = useColorModeValue(`lg`, `md`);
  const headingColor = useColorModeValue(`gunmetal`, `mintCream`);

  return (
    <Box py="4" bgColor={bgColor} boxShadow={boxShadow}>
      <Container maxW="4xl">
        <Flex justify="space-between">
          <HStack align="center">
            <Box w="16">
              <LuancodeIcon />
            </Box>
            <Heading as="h1" size="sm" color={headingColor}>
              tools
            </Heading>
          </HStack>
          <ColorModeSwitcher />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
