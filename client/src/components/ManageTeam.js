import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  Input,
  FormLabel,
  Button,
  Box,
  useDisclosure,
  Text,
  IconButton,
  useToast,
} from '@chakra-ui/core';
const ManageTeam = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [memberToAdd, setMemberToAdd] = useState('');
  const [memberToRemove, setMemberToRemove] = useState('');
  const toast = useToast();
  const handleSubmit = async (evt, method) => {
    evt.preventDefault();
    let url = '';
    {
      method === 'POST'
        ? (url = `/teams/${props.team.id}/members`)
        : (url = `/teams/${props.team.id}/members/${memberToRemove}`);
    }

    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ member: memberToAdd }),
    });
    const json = await res.json();
    console.log(json);

    if (json.message == 'member added') {
      onClose();
      setMemberToRemove('');
      setMemberToAdd('');
      toast({
        position: 'top',
        title: 'User added!',
        description: `${memberToAdd} is now a part of the team!`,
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
    } else if (json.message == 'member removed') {
      onClose();
      setMemberToRemove('');
      setMemberToAdd('');
      toast({
        position: 'top',
        title: 'User removed',
        description: `${memberToRemove} was removed from the team`,
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
    } else {
      toast({
        position: 'top',
        title: 'User not found',
        description: 'Sorry! Check for typos.',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e, form) => {
    form === 'add'
      ? setMemberToAdd(e.target.value)
      : setMemberToRemove(e.target.value);
  };
  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Text
          onClick={() => props.setActiveTeam(props.team)}
          pl={{ xs: '0', sm: '0', md: '5%', lg: '5%', xl: '5%' }}
          fontSize="1.5rem"
          color="white"
          cursor="pointer"
        >
          {props.team.name}
        </Text>
        <IconButton onClick={onOpen} size="xs" icon="settings" />
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size="xl"
      >
        <ModalOverlay w="100%" h="100%" bg="rgb(0 0 0 / 50%)" />
        <ModalContent
          bg="white"
          bgPos="center"
          color="black"
          borderRadius="lg"
          boxShadow="1px 3px 32px #63B3ED"
        >
          <ModalHeader color={'#63B3ED'}>Manage {props.team.name}</ModalHeader>
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e, 'POST')}>
              <FormControl>
                <FormLabel color={'#63B3ED'}>Add a member</FormLabel>
                <Input
                  name="member"
                  value={memberToAdd}
                  onChange={(e) => handleChange(e, 'add')}
                />
              </FormControl>
              <FormControl>
                <Box>
                  <Button
                    variant="outline"
                    variantColor="blue.300"
                    color="#63B3ED"
                    mr={3}
                    mt={3}
                    type="submit"
                  >
                    Submit!
                  </Button>
                </Box>
              </FormControl>
            </form>
            <form onSubmit={(e) => handleSubmit(e, 'DELETE')}>
              <FormControl>
                <FormLabel color={'#63B3ED'}>Remove a member</FormLabel>
                <Input
                  name="member"
                  value={memberToRemove}
                  onChange={(e) => handleChange(e, 'remove')}
                />
              </FormControl>
              <FormControl>
                <Box>
                  <Button
                    variant="outline"
                    variantColor="blue.300"
                    color="#63B3ED"
                    mr={3}
                    mt={3}
                    type="submit"
                  >
                    Submit!
                  </Button>
                </Box>
              </FormControl>
            </form>
            <Button
              onClick={onClose}
              variant="outline"
              variantColor="red"
              mr={3}
              mt={3}
            >
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ManageTeam;
