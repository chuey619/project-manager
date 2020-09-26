import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/core';
const Register = (props) => {
  const toast = useToast();
  const [, dispatch] = useUserContext();
  const [user, setUser] = useState({
    username: '',
    name: '',
    password: '',
  });
  const history = useHistory();
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUser((oldState) => {
      return {
        ...oldState,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let response = await fetch(`/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          name: user.name,
          password: user.password,
        },
      }),
    });
    setUser({
      username: '',
      name: '',
      password: '',
    });
    let res = await response.json();
    if (res?.data?.user) {
      dispatch({
        type: 'login',
        user: res?.data?.user,
      });
      history.push('/home');
    } else {
      toast({
        position: 'top',
        title: 'Username and name already taken',
        description: 'enter a unique username',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Flex
        width="full"
        align="center"
        justifyContent="space-evenly"
        bg="white"
        w="40%"
        minW="310px"
        h="auto"
        p={4}
        gridArea="main"
        direction="column"
        zIndex="1"
        border="1px solid lightgrey"
        borderRadius="20px"
        boxShadow=" 0px 0px 17px -1px rgba(173,173,173,1);"
      >
        <Box textAlign="center">
          <Heading color="blue.300">Register</Heading>
        </Box>
        <Box my={4} textAlign="left" w="70%" minW="300px">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel color={'#726E75'}>Name</FormLabel>
              <Input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Your full name"
                value={user.name}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel color={'#726E75'}>Username</FormLabel>
              <Input
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="Username"
                value={user.username}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel color={'#726E75'}>Password</FormLabel>
              <Input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                value={user.password}
              />
            </FormControl>
            <Button width="full" mt={4} type="submit" color={'#726E75'}>
              Register
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Register;
