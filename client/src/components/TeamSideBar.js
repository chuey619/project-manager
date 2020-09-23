import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Box, Stack, Button, IconButton } from '@chakra-ui/core';

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
        textAlign="left"
        lineHeight="2.5rem"
        padding={2}
        h="100%"
      >
        {!props.teams && <Text>No teams found... Join or create a team!</Text>}
        {props.teams.leadTeams &&
          props.teams.leadTeams.map((team, i) => (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Text
                key={i}
                onClick={() => props.setActiveTeam(team)}
                fontWeight="bold"
                fontSize="1.5rem"
              >
                {team.name}
              </Text>
              <IconButton size="xs" icon="settings" />
            </Box>
          ))}
        {props.teams.teams &&
          props.teams.teams.map((team, i) => (
            <Text
              key={i}
              onClick={() => props.setActiveTeam(team)}
              fontWeight="bold"
              fontSize="1.5rem"
            >
              {team.name}
            </Text>
          ))}
        <Button
          onClick={props.onOpen}
          variant="outline"
          variantColor="#63B3ED"
          color="#63B3ED"
        >
          Create a team
        </Button>
      </Stack>
    </Box>
  );
};

export default TeamSideBar;
