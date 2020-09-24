import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/core';

const HomeHeader = (props) => {
  return (
    <Box>
      <Heading>Welcome {props.name}</Heading>
      <Text>Select a team to view projects</Text>
    </Box>
  );
};

export default HomeHeader;
