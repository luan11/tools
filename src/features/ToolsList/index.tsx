import { useEffect } from 'react';
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

import useRepositories from './../../hooks/useRepositories';
import ToolListItem from './../../components/ToolListItem';

const ToolsList = () => {
  const { isLoading, errorMessage, data } = useRepositories();
  const toast = useToast();

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: `An error occurred`,
        description: errorMessage,
        status: `error`,
        duration: 9000,
        isClosable: true,
        position: `top-left`,
      });
    }
  }, [errorMessage, toast]);

  return (
    <Box mt={{ base: 131, sm: 75 }} py={8}>
      <Container maxW="6xl">
        <Divider mb={8} />

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
            {data.length > 0 && (
              <Grid
                templateColumns={{
                  sm: `1fr`,
                  md: `repeat(2, 1fr)`,
                  lg: `repeat(3, 1fr)`,
                }}
                gap="4"
              >
                {data.map((props) => (
                  <GridItem key={props.title}>
                    <ToolListItem {...props} />
                  </GridItem>
                ))}
              </Grid>
            )}
            {!data.length && <Text textAlign="center">No tools found</Text>}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ToolsList;
