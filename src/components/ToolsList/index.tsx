import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Divider,
  Spinner,
  Grid,
  GridItem,
  Text,
  useToast,
} from '@chakra-ui/react';

import api from './../../services/api';
import isAxiosError from './../../utils/isAxiosError';
import ToolListItem from './../ToolListItem';

type ToolProps = {
  description: string | null;
  language: string;
  livePreviewUrl: string | null;
  repoUrl: string;
  starsCount: number;
  subtitle: string;
  title: string;
};

type ErrorMessageProps = {
  message: string;
};

type RepoProps = Pick<ToolProps, `description` | `language`> & {
  full_name: string;
  homepage: string | null;
  html_url: string;
  name: string;
  stargazers_count: number;
  topics: string[];
};

const TOOLS = `luancode-tools`;

const ToolsList = () => {
  const [tools, setTools] = useState<ToolProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);

        const { data } = await api.get<RepoProps[]>(`/users/luan11/repos`, {
          params: {
            sort: `created`,
            visibility: `public`,
          },
        });

        setTools(
          data
            .filter(({ topics }) => topics.includes(TOOLS))
            .map(
              ({
                description,
                full_name,
                homepage,
                html_url,
                language,
                name,
                stargazers_count,
              }) => ({
                description,
                language,
                livePreviewUrl: homepage,
                repoUrl: html_url,
                starsCount: stargazers_count,
                subtitle: full_name,
                title: name,
              })
            )
        );
      } catch (error) {
        if (isAxiosError<ErrorMessageProps>(error)) {
          toast({
            title: `An error occurred`,
            description: error.response?.data.message,
            status: `error`,
            duration: 9000,
            isClosable: true,
            position: `top-left`,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();

    return () => {
      setTools([]);
    };
  }, [toast]);

  console.log(tools);

  return (
    <Box py="4">
      <Container maxW="4xl">
        <Divider mb="4" />

        {isLoading ? (
          <Box
            minHeight="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner />
          </Box>
        ) : (
          <>
            {tools.length > 0 && (
              <Grid templateColumns="repeat(3, 1fr)" gap="4">
                {tools.map((props) => (
                  <GridItem key={props.title}>
                    <ToolListItem {...props} />
                  </GridItem>
                ))}
              </Grid>
            )}
            {!tools.length && <Text textAlign="center">No tools found</Text>}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ToolsList;
