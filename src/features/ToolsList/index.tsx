import { useEffect } from 'react';
import { Box, Spinner, Grid, GridItem, Text, useToast } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useDispatch } from 'react-redux';

import useRepositories from './../../hooks/useRepositories';
import { AppDispatch } from './../../store';
import { toggleIsSearchEnabled } from './toolsListSlice';
import ToolListItem from './../../components/ToolListItem';

const ToolsList = () => {
  const { isLoading, errorMessage, data } = useRepositories();
  const toast = useToast();
  const [animationParent] = useAutoAnimate<HTMLDivElement>();
  const dispatch = useDispatch<AppDispatch>();

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

  useEffect(() => {
    dispatch(toggleIsSearchEnabled());

    return () => {
      dispatch(toggleIsSearchEnabled());
    };
  }, [dispatch]);

  return (
    <>
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

      {!isLoading && (
        <Grid
          ref={animationParent}
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

      {!isLoading && !data.length && (
        <Text textAlign="center">No tools found</Text>
      )}
    </>
  );
};

export default ToolsList;
