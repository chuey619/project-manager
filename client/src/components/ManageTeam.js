import React, { useState, useRef } from 'react';
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
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/core';
const ManageTeam = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [memberToAdd, setMemberToAdd] = useState('');
  const [memberToRemove, setMemberToRemove] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const cancelRef = useRef();
  const onCloseAlert = () => {
    setIsOpenAlert(false);
  };
  const deleteTeam = async (team) => {
    const url = `/teams/${team.id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (json.message === 'team deleted') {
      toast({
        position: 'top',
        title: 'Team deleted',
        description: `${team.name} was deleted`,
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
      props.setShouldFetchTeams(!props.shouldFetchTeams);
    } else {
      toast({
        position: 'top',
        title: 'Could not delete team',
        description: `Only the team lead can delete teams`,
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
    }
  };

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
      <Box
        onClick={() => props.setActiveTeam(props.team)}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Text
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
                  placeholder={`User's username`}
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
                <Select
                  placeholder="Select a team member"
                  onChange={(e) => handleChange(e, 'remove')}
                >
                  {props.members?.length > 0 &&
                    props.members?.map((member, i) => {
                      return (
                        <option key={i} value={member.username}>
                          {member.username}
                        </option>
                      );
                    })}
                </Select>
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
            <Box d="flex">
              <Button
                onClick={onClose}
                variant="outline"
                variantColor="red"
                mr={3}
                mt={3}
              >
                Close
              </Button>
              <Button
                mt={3}
                variant="outline"
                variantColor="red"
                onClick={() => setIsOpenAlert(true)}
              >
                Delete team
              </Button>
            </Box>

            <AlertDialog
              isOpen={isOpenAlert}
              leastDestructiveRef={cancelRef}
              onClose={onCloseAlert}
            >
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Team
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onCloseAlert}>
                    Cancel
                  </Button>
                  <Button
                    variantColor="red"
                    onClick={() => {
                      onCloseAlert();
                      deleteTeam(props.team);
                      onClose();
                    }}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ManageTeam;
