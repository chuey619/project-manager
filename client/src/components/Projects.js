import React, { useState, useRef } from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Text,
  Button,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/core';
import { NewProject, CustomLink as Link } from './index';
const Projects = (props) => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [project, setProject] = useState({});
  const cancelRef = useRef();
  const onCloseAlert = () => {
    setIsOpenAlert(false);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const deleteProject = async (project) => {
    const url = `/teams/${props.team.id}/projects/${project.id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let json = await response.json();
    if (json.message === 'project deleted') {
      toast({
        position: 'top',
        title: 'Project deleted',
        description: `${project.name} was successfully deleted`,
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
      props.setShouldFetchProjects(!props.shouldFetchProjects);
    } else {
      toast({
        position: 'top',
        title: 'Could not delete project',
        description: `Only the team lead can delete projects`,
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
    }
  };
  const renderAlertDialogue = () => {
    return (
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Project
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
                deleteProject(project);
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  const renderProjects = () => {
    return (
      <Accordion>
        {props.projects?.length > 0 ? (
          props.projects.map((project, i) => (
            <AccordionItem
              key={i}
              mt={{ base: '5%', lg: '2%', xl: '2%' }}
              mb={{ base: '5%', lg: '2%', xl: '2%' }}
              defaultIsOpen="false"
            >
              <AccordionHeader fontWeight="bold">
                {project.name}
              </AccordionHeader>
              <AccordionPanel>
                <Box
                  flexDirection="row"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Text>{project.description}</Text>
                  <Box
                    display="flex"
                    flexDirection={{
                      xs: 'column',
                      sm: 'column',
                      md: 'row',
                      lg: 'row',
                      xl: 'row',
                    }}
                    justifyContent="space-between"
                    w="auto"
                  >
                    <Link
                      to={{
                        pathname: `/${props.team.name}/${project.name}`,
                        state: project,
                      }}
                      color="#63B3ED"
                      mr="1%"
                    >
                      Go to project
                    </Link>

                    <Link
                      // _hover={{
                      //   cursor: 'pointer',
                      //   textDecortaion: 'underline',
                      // }}
                      onClick={() => {
                        setProject(project);
                        setIsOpenAlert(true);
                      }}
                      color="red.300"
                    >
                      Delete project
                    </Link>
                  </Box>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          ))
        ) : (
          <Text>
            Looks like {props.team.name} has no projects... Create one!
          </Text>
        )}
        ;
      </Accordion>
    );
  };
  return (
    <Box overflowX="auto" minW="100px">
      {Object.keys(props.team).length > 0 ? (
        <>
          {renderProjects()}
          <Button onClick={onOpen}>Add a new project</Button>
        </>
      ) : (
        <Text>Select a team to view projects</Text>
      )}

      <NewProject
        shouldFetchProjects={props.shouldFetchProjects}
        setShouldFetchProjects={props.setShouldFetchProjects}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        team={props.team}
      />
      {renderAlertDialogue()}
    </Box>
  );
};

export default Projects;
