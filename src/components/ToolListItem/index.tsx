import { Box, Heading } from '@chakra-ui/react';

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
}: ToolListItemProps) => (
  <Box
    border="1px"
    borderRadius="lg"
    borderColor="gray.600"
    overflow="hidden"
    py="2"
    px="4"
  >
    <Heading as="h2" size="sm">
      {title}
    </Heading>
    <Heading as="h6" size="xs" color="gray.600">
      {subtitle}
    </Heading>
  </Box>
);

export default ToolListItem;
