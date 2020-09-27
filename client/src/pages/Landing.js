import React from 'react';
import { Redirect } from 'react-router-dom';
import { Login, Register } from '../components';
import { Box, Heading, Text } from '@chakra-ui/core';
const Landing = (props) => {
  return (
    <Box backgroundColor="white" p="3%">
      {props.user[0].user?.id && <Redirect to="/home" />}
      <Heading color={'#515052'}>Welcome to Project Manager</Heading>
      <Text color={'#515052'}>Register or Sign up to continue!</Text>
      <Box
        m={{ sm: '10% auto', lg: '5% auto' }}
        flexDirection={{ md: 'row', sm: 'column' }}
        maxW="940px"
        display="flex"
        justifyContent={'space-around'}
      >
        <Login />
        <Text
          color={'#515052'}
          m="auto"
          fontWeight="bold"
          fontSize="xl"
          textAlign="center"
        >
          OR
        </Text>
        <Register />
      </Box>
    </Box>
  );
};

export default Landing;
