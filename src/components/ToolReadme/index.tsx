import { useEffect, useState } from 'react';
import { Link as ReachLink, useParams } from '@reach/router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  useColorModeValue,
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

import useSelectTools from './../../hooks/useSelectTools';
import { AppDispatch } from './../../store';
import { setToolReadme } from './../../features/ToolsList/toolsListSlice';

type Params = {
  slug: string;
};

const ToolReadme = () => {
  const githubButtonBgColor = useColorModeValue(`gray.600`, `gunmetal`);

  const { slug } = useParams<Params>();
  const { all } = useSelectTools();
  const dispatch = useDispatch<AppDispatch>();

  const {
    readme,
    title,
    language,
    subtitle,
    starsCount,
    description,
    livePreviewUrl,
    repoUrl,
  } = all.find(({ title }) => title === slug) ?? {};

  const [readmeContent, setReadmeContent] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [tryInMaster, setTryInMaster] = useState(false);

  useEffect(() => {
    const getReadmeContent = async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get<string>(
          `https://raw.githubusercontent.com/luan11/${slug}/${
            tryInMaster ? `master` : `main`
          }/README.md`
        );

        setReadmeContent(data);
        dispatch(setToolReadme({ slug, readme: data }));
      } catch {
        setTryInMaster(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (!readme) {
      getReadmeContent();
    } else {
      setReadmeContent(readme);
    }

    return () => {
      setReadmeContent(undefined);
    };
  }, [slug, dispatch, tryInMaster, readme]);

  return (
    <Box overflow="hidden">
      <Box
        mb={8}
        display="flex"
        justifyContent="space-between"
        flexDir={{
          base: `column`,
          sm: `row`,
        }}
        alignItems={{
          base: `flex-start`,
          sm: `center`,
        }}
      >
        <VStack align="flex-start" mb={{ base: 3, sm: 0 }}>
          <HStack wrap={{ base: `wrap`, sm: `nowrap` }}>
            <Heading as="h2" size="xl">
              {title}
            </Heading>
            <Badge colorScheme="teal">{language}</Badge>
          </HStack>

          <HStack>
            <Heading as="h6" size="xs" color="gray.500">
              {subtitle}
            </Heading>

            <HStack>
              <Text>-</Text>
              <Box color="yellow.300">
                {!!starsCount ? <AiFillStar /> : <AiOutlineStar />}
              </Box>
              <Text fontSize="xs">{starsCount}</Text>
            </HStack>
          </HStack>

          <Text fontSize="sm">{description}</Text>

          <HStack>
            {livePreviewUrl && (
              <Link
                href={livePreviewUrl}
                isExternal
                _hover={{ textDecor: `none` }}
              >
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
          </HStack>
        </VStack>

        <Divider display={{ base: `block`, sm: `none` }} mb={3} />

        <Button
          leftIcon={<FiArrowLeft />}
          colorScheme="blue"
          as={ReachLink}
          to="/"
          w={{
            base: `full`,
            sm: `auto`,
          }}
        >
          Go back
        </Button>
      </Box>

      {isLoading && (
        <Box
          minHeight="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner />
        </Box>
      )}

      {!isLoading && !!readmeContent && (
        <>
          <ReactMarkdown
            children={readmeContent}
            remarkPlugins={[remarkGfm, remarkEmoji]}
            rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug]}
          />
        </>
      )}

      {!isLoading && !readmeContent && (
        <Text textAlign="center">No readme found</Text>
      )}
    </Box>
  );
};

export default ToolReadme;
