import React, { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Divider,
  Icon,
} from '@chakra-ui/core';

import { CustomLink as Link } from '.';
import { isEmpty } from '../util';
import { useUserContext } from '../contexts/userContext';
import { useHistory } from 'react-router-dom';

const NavbarItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Navbar = (props) => {
  const [{ user }, dispatch] = useUserContext();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const handleLogout = (evt) => {
    evt.preventDefault();
    fetch(`/auth/logout`, {
      method: 'GET',
    }).then((res) => {
      dispatch({
        type: 'logout',
      });
      history.push('/');
    });
  };

  return (
    <Flex
      display="flex"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="white"
      color="blue.300"
      gridArea="nav"
      {...props}
      borderBottom=".5px solid #63B3ED"
    >
      <Link to="/">
        <Flex align="center" mr={5}>
          <Icon name="check" mr={2} size={'1.5em'} color="blue.300" />
          <Heading
            textDecoration="underline"
            as="h1"
            size="lg"
            letterSpacing={'-.1rem'}
            color="blue.300"
          >
            Project Manager
          </Heading>
        </Flex>
      </Link>
      <Box display={{ base: 'block', md: 'none' }} onClick={toggleShow}>
        <svg
          fill="blue.300"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="flex-end"
        flexGrow={1}
        bg="white"
        zIndex={2}
      >
        <Link to="/about">
          <NavbarItems>About</NavbarItems>
        </Link>

        <Link isDisabled={isEmpty(user) ? true : false} to="/home">
          <NavbarItems>Home</NavbarItems>
        </Link>
      </Box>

      <Flex
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        {!isEmpty(user) && (
          <Button
            border="1px"
            variant="outline"
            variantColor="blue.300"
            color="#63B3ED"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
