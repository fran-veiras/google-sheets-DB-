import { Box, Heading, Text } from '@chakra-ui/layout';
import React from 'react';

export const Personas = (props) => {
  const { name, age, country } = props;

  return (
    <Box display="flex" gridGap={5} background="teal.400">
      <Text>{name}</Text>
      <Text>{age}</Text>
      <Text>{country}</Text>
    </Box>
  );
};
