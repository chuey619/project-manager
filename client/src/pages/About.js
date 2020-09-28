import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/core';
const About = () => {
  return (
    <Box
      lineHeight="3rem"
      d="flex"
      flexDirection="column"
      mt="5%"
      textAlign="center"
    >
      <Heading>Welcome to project manager</Heading>
      <Text m="0 auto" maxW="50%">
        Create a team or have your team lead add you as a member. Once you are
        part of a team, view and create projects and keep track of them all in
        one place. Updating projects is as simple as dragging and dropping and
        getting in contact with your team is made easy via chat.
      </Text>
    </Box>
  );
};

export default About;
