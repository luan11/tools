import { useEffect, useState } from 'react';
import { Link, useParams } from '@reach/router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiHome } from 'react-icons/fi';

import useSelectTools from './../../hooks/useSelectTools';
import { AppDispatch } from './../../store';
import { setToolReadme } from './../../features/ToolsList/toolsListSlice';

type Params = {
  slug: string;
};

const ToolReadme = () => {
  const { slug } = useParams<Params>();
  const { all } = useSelectTools();
  const dispatch = useDispatch<AppDispatch>();

  const { readme, title, language, subtitle } =
    all.find(({ title }) => title === slug) ?? {};

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

        setTryInMaster(false);
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
    <Box>
      <HStack mb={8} justify="space-between">
        <VStack align="flex-start">
          <HStack>
            <Heading as="h2" size="xl">
              {title}
            </Heading>
            <Badge colorScheme="teal">{language}</Badge>
          </HStack>

          <Heading as="h6" size="xs" color="gray.500">
            {subtitle}
          </Heading>
        </VStack>

        <Button leftIcon={<FiHome />} colorScheme="blue" as={Link} to="/">
          Go home
        </Button>
      </HStack>

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

      {!isLoading && !!readmeContent ? (
        <>
          <Divider mb={4} />

          <ReactMarkdown
            children={readmeContent}
            remarkPlugins={[remarkGfm]}
            skipHtml
          />
        </>
      ) : (
        <Text textAlign="center">No readme found</Text>
      )}
    </Box>
  );
};

export default ToolReadme;
