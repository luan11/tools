import {
  useColorModeValue,
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
  const githubButtonColorScheme = useColorModeValue(`blackAlpha`, `gray`);

  return (
    <Box
      border="1px"
      borderRadius="lg"
      borderColor="gray.500"
      overflow="hidden"
      py="2"
      px="4"
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
      <Text fontSize="sm">{description}</Text>
      <Divider my="2" />
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
            colorScheme={githubButtonColorScheme}
            icon={<FiGithub />}
            size="sm"
          />
        </Link>
      </HStack>
    </Box>
  );
};

export default ToolListItem;
