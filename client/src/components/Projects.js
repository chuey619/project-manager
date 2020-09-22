import React from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Text,
  Button,
} from '@chakra-ui/core';

const Projects = (props) => {
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
                  <Text>Project Description</Text>
                  <Button color="#63B3ED" border="3px solid #63B3ED">
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
    </Box>
  );
};

export default Projects;
