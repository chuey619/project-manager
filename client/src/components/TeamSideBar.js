import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Box, Stack, Button } from '@chakra-ui/core';

const TeamSideBar = (props) => {
  return (
    <Box
      h="100%"
      border="1px solid lightgrey"
      boxShadow=" 0px 0px 17px -1px rgba(173,173,173,1)"
      borderRadius="20px"
    >
      <Stack
        position="relative"
        textAlign="center"
        lineHeight="2.5rem"
        padding={6}
        h="100%"
      >
        {props.teams.length > 0 ? (
          props.teams.map((team, i) => (
            <Text
              key={i}
              onClick={() => props.setActiveTeam(team)}
              fontWeight="bold"
              fontSize="1.5rem"
            >
              {team.name}
            </Text>
          ))
        ) : (
          <Text>No teams found... Join or create a team!</Text>
        )}
        <Button border="3px solid #63B3ED">Create a team</Button>
      </Stack>
    </Box>
  );
};

export default TeamSideBar;
