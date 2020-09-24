import React from 'react';

import { Link as ReactLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/core';

const CustomLink = (props) => {
  return <ChakraLink as={ReactLink} {...props}></ChakraLink>;
};

export default CustomLink;
