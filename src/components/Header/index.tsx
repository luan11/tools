import {
  useColorModeValue,
  Box,
  Container,
  Flex,
  VStack,
  Text,
  Heading,
  HStack,
  Link,
  IconButton,
} from '@chakra-ui/react';
import { FiGithub } from 'react-icons/fi';

import ColorModeSwitcher from './../ColorModeSwitcher';
import Search from './../Search';

const Header = () => {
  const bgColor = useColorModeValue(`white`, `gray.700`);
  const boxShadow = useColorModeValue(`lg`, `md`);
  const headingColor = useColorModeValue(`gunmetal`, `mintCream`);
  const githubButtonBgColor = useColorModeValue(`gray.600`, `gunmetal`);

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
        <Flex
          justify={{
            base: `center`,
            sm: `space-between`,
          }}
          wrap={{
            base: `wrap`,
            sm: `nowrap`,
          }}
        >
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

          <HStack w={{ base: `full`, sm: `auto` }} mt={{ base: 4, sm: 0 }}>
            <Search />

            <ColorModeSwitcher />
            <Link href="https://github.com/luan11/tools" isExternal>
              <IconButton
                aria-label="Go to repository"
                as="span"
                color="white"
                bgColor={githubButtonBgColor}
                icon={<FiGithub size={18} />}
                size="md"
                _hover={{
                  bgColor: `gray.800`,
                }}
              />
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
