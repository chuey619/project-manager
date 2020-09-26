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
import { NewProject, CustomLink as Link } from './index';
const Projects = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box overflowX="auto" minW="100px">
      <Accordion>
        {props.team !== {} ? (
          props.projects?.length > 0 ? (
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

                    <Link
                      to={{
                        pathname: `/${props.team.name}/${project.name}`,
                        state: project,
                      }}
                      color="#63B3ED"
                    >
                      Go to project
                    </Link>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            ))
          ) : (
            <Text>
              Looks like {props.team.name} has no projects... Create one!
            </Text>
          )
        ) : (
          <p>test</p>
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
