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
} from '@chakra-ui/core';

const NewTeam = (props) => {
  const [name, setName] = useState({ name: '' });
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setName((oldState) => {
      return {
        ...oldState,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let response = await fetch(`/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(name),
    });
    props.onClose();
    props.setShouldFetchTeams(!props.shouldFetchTeams);
    setName({ name: '' });
  };
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
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
          <ModalHeader color={'#63B3ED'}>Create a new team</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel color={'#63B3ED'}>Team Name</FormLabel>
                <Input name="name" value={name.name} onChange={handleChange} />
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
                  <Button
                    onClick={props.onClose}
                    variant="outline"
                    variantColor="red"
                    mr={3}
                    mt={3}
                  >
                    Close
                  </Button>
                </Box>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewTeam;
