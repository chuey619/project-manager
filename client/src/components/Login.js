import React, { useState } from 'react';
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
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const history = useHistory();
  const toast = useToast();
  const [, dispatch] = useUserContext();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((oldState) => {
      return {
        ...oldState,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let json = await res.json();
    if (json?.data?.user) {
      dispatch({
        type: 'login',
        user: json?.data?.user,
      });
      history.push('/home');
    } else {
      toast({
        position: 'top',
        title: 'Invalid login',
        description: 'Incorrect username or password',
        status: 'error',
        duration: 7000,
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
        w="30%"
        minW="380px"
        h="auto"
        p={6}
        direction="column"
        gridArea="main"
        zIndex="1"
        border="1px solid lightgrey"
        borderRadius="20px"
        boxShadow=" 0px 0px 17px -1px rgba(173,173,173,1);"
      >
        <Box position="top" textAlign="center">
          <Heading color="blue.300">Login</Heading>
        </Box>
        <Box my={4} textAlign="left" w="30%" minW="360px">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel color={'#726E75'}>Username</FormLabel>
              <Input
                type="text"
                placeholder="enter username/email"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel color={'#726E75'}>Password</FormLabel>
              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="enter password"
              />
            </FormControl>
            <Button width="full" mt={4} type="submit" color={'#726E75'}>
              Sign In
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
