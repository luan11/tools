import {
  useColorModeValue,
  Flex,
  Box,
  HStack,
  Heading,
  Badge,
  Text,
  Divider,
  Link,
  IconButton,
} from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

type ToolListItemProps = {
  description: string | null;
  language: string;
  livePreviewUrl: string | null;
  repoUrl: string;
  starsCount: number;
  subtitle: string;
  title: string;
};

const ToolListItem = ({
  description,
  language,
  livePreviewUrl,
  repoUrl,
  starsCount,
  subtitle,
  title,
}: ToolListItemProps) => {
  const containerBoxShadow = useColorModeValue(`lg`, `md`);
  const containerBgColor = useColorModeValue(``, `gray.700`);
  const githubButtonBgColor = useColorModeValue(`gray.600`, `gunmetal`);

  return (
    <Flex
      borderRadius="lg"
      overflow="hidden"
      py="4"
      px="8"
      boxShadow={containerBoxShadow}
      bgColor={containerBgColor}
      direction="column"
      h="full"
    >
      <HStack>
        <Heading as="h2" size="sm">
          {title}
        </Heading>
        <Badge colorScheme="teal">{language}</Badge>
      </HStack>
      <Heading as="h6" size="xs" color="gray.500">
        {subtitle}
      </Heading>
      <HStack my="2">
        <Box color="yellow.300">
          {starsCount > 0 ? <AiFillStar /> : <AiOutlineStar />}
        </Box>
        <Text fontSize="xs">{starsCount}</Text>
      </HStack>
      <Text fontSize="sm" pb={2}>
        {description}
      </Text>
      <Divider mt="auto" mb={2} />
      <HStack>
        {livePreviewUrl && (
          <Link href={livePreviewUrl} isExternal>
            <IconButton
              aria-label="Go to live preview"
              as="span"
              colorScheme="teal"
              icon={<FiExternalLink />}
              size="sm"
            />
          </Link>
        )}
        <Link href={repoUrl} isExternal>
          <IconButton
            aria-label="Go to repository"
            as="span"
            color="white"
            bgColor={githubButtonBgColor}
            icon={<FiGithub />}
            size="sm"
            _hover={{
              bgColor: `gray.800`,
            }}
          />
        </Link>
      </HStack>
    </Flex>
  );
};

export default ToolListItem;
