import React from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/core';
import { NewProject } from './index';
const Projects = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
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
                  <Button
                    variant="outline"
                    variantColor="#63B3ED"
                    color="#63B3ED"
                  >
                    Go to project
                  </Button>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          ))
        ) : (
          <Text>
            Looks like {props.team.name} has no projects... Create one!
          </Text>
        )}
      </Accordion>
      <NewProject
        shouldFetchProjects={props.shouldFetchProjects}
        setShouldFetchProjects={props.setShouldFetchProjects}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        team={props.team}
      />
      <Button onClick={onOpen}>Add a new project</Button>
    </Box>
  );
};

export default Projects;
