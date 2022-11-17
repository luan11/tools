import { RouteComponentProps, Link as ReachLink } from '@reach/router';
import { Heading, Text, Flex, Button } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = (props: RouteComponentProps) => (
  <>
    <Heading textAlign="center">404</Heading>
    <Text textAlign="center">Not found</Text>
    <Flex justify="center" mt={4}>
      <Button as={ReachLink} to="/" leftIcon={<FiArrowLeft />}>
        Go back
      </Button>
    </Flex>
  </>
);

export default NotFound;
