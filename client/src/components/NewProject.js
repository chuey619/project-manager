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
  Textarea,
} from '@chakra-ui/core';

const NewProject = (props) => {
  const [project, setProject] = useState({ name: '', description: '' });
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setProject((oldState) => {
      return {
        ...oldState,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let response = await fetch(`/teams/${props.team.id}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    props.onClose();
    props.setShouldFetchProjects(!props.shouldFetchProjects);
    setProject({ name: '', description: '' });
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
          <ModalHeader color={'#63B3ED'}>Create a new Project</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel color={'#63B3ED'}>Project Name</FormLabel>
                <Input
                  name="name"
                  value={project.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel color={'#63B3ED'}>Project Description</FormLabel>
                <Textarea
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <Box>
                  <Button
                    variant="outline"
                    variantColor="#63B3ED"
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

export default NewProject;
