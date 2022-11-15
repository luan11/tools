import {
  useColorModeValue,
  Flex,
  Skeleton,
  Image,
  Box,
  HStack,
  Heading,
  Badge,
  Text,
  Divider,
  Link,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { BsFileText } from 'react-icons/bs';
import useLinkPreview from 'use-link-preview';
import { Link as ReachLink } from '@reach/router';

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
  const { isLoading, metadata } = useLinkPreview(repoUrl);

  const containerBoxShadow = useColorModeValue(`lg`, `md`);
  const containerBgColor = useColorModeValue(``, `gray.700`);
  const githubButtonBgColor = useColorModeValue(`gray.600`, `gunmetal`);

  return (
    <Flex
      borderRadius="lg"
      overflow="hidden"
      pb={4}
      boxShadow={containerBoxShadow}
      bgColor={containerBgColor}
      direction="column"
      h="full"
    >
      {isLoading && <Skeleton h="180" w="full" />}
      {!isLoading && metadata && metadata.img && (
        <Image src={metadata.img} alt={title} objectFit="cover" h="180" />
      )}

      {!isLoading && (!metadata || !metadata.img) && (
        <Flex align="center" justify="center" h="180" bgColor="blackAlpha.50">
          <FiExternalLink size={48} />
        </Flex>
      )}

      <HStack mt={4} px={8}>
        <Heading as="h2" size="sm">
          {title}
        </Heading>
        <Badge colorScheme="teal">{language}</Badge>
      </HStack>

      <Heading as="h6" size="xs" color="gray.500" px={8}>
        {subtitle}
      </Heading>

      <HStack my={2} px={8}>
        <Box color="yellow.300">
          {starsCount > 0 ? <AiFillStar /> : <AiOutlineStar />}
        </Box>
        <Text fontSize="xs">{starsCount}</Text>
      </HStack>

      <Text fontSize="sm" pb={4} px={8}>
        {description}
      </Text>

      <Box mt="auto" mb={2} px={8}>
        <Divider />
      </Box>

      <HStack px={8} wrap="wrap" justify="center">
        {livePreviewUrl && (
          <Link href={livePreviewUrl} isExternal _hover={{ textDecor: `none` }}>
            <Button
              aria-label="Go to live preview"
              as="span"
              colorScheme="teal"
              leftIcon={<FiExternalLink size={18} />}
              size="sm"
            >
              Live preview
            </Button>
          </Link>
        )}

        <Link href={repoUrl} isExternal _hover={{ textDecor: `none` }}>
          <Button
            aria-label="Go to repository"
            as="span"
            color="white"
            bgColor={githubButtonBgColor}
            leftIcon={<FiGithub size={18} />}
            size="sm"
            _hover={{
              bgColor: `gray.800`,
            }}
          >
            The code
          </Button>
        </Link>

        <Button
          colorScheme="blue"
          as={ReachLink}
          to={`/readme/${title}`}
          size="sm"
          leftIcon={<BsFileText size={18} />}
          style={{ marginTop: `var(--chakra-sizes-2)` }}
        >
          Docs
        </Button>
      </HStack>
    </Flex>
  );
};

export default ToolListItem;
