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
  };
};
