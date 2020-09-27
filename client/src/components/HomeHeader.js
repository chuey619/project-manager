import React from 'react';
import { Box, Heading } from '@chakra-ui/core';

const HomeHeader = (props) => {
  return (
    <Box>
      <Heading>Welcome {props.name}</Heading>
    </Box>
  );
};

export default HomeHeader;
