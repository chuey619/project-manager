import React, { useState, useRef } from 'react';
import { ManageTeam, Alert } from './index';
import { Text, Box, Stack, Button, IconButton, Heading } from '@chakra-ui/core';

const TeamSideBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedTeam, setClickedTeam] = useState();
  const cancelRef = useRef();
  const onClose = () => {
    setIsOpen(false);
  };
  const leaveTeam = async (team) => {
    const url = `/teams/${team.id}/members/${props.username}`;
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    props.setShouldFetchTeams(!props.shouldFetchTeams);
  };
  const renderAlertDialogue = () => {
    return (
      <Alert
        action="Leave"
        itemType={'Team'}
        itemToDelete={clickedTeam}
        deleteFunction={leaveTeam}
        isOpenAlert={isOpen}
        cancelRef={cancelRef}
        onCloseAlert={onClose}
      />
    );
  };
  return (
    <Box h="100%" bg="#515052">
      <Stack
        position="relative"
        textAlign="left"
        lineHeight="3rem"
        padding={2}
        h="100%"
      >
        <Heading
          textDecoration="underline"
          fontWeight="300"
          size="lg"
          color="white"
        >
          My Teams:
        </Heading>
        {!props.teams && <Text>No teams found... Join or create a team!</Text>}
        {props.teams.leadTeams &&
          props.teams.leadTeams.map((team, i) => (
            <ManageTeam
              members={props.members}
              team={team}
              key={i * 2}
              setActiveTeam={props.setActiveTeam}
              setShouldFetchTeams={props.setShouldFetchTeams}
              shouldFetchTeams={props.shouldFetchTeams}
            />
          ))}
        {props.teams.teams &&
          props.teams.teams.map((team, i) => (
            <>
              <Box
                key={i}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Text
                  pl={{ xs: '0', sm: '0', md: '5%', lg: '5%', xl: '5%' }}
                  cursor="pointer"
                  color="white"
                  onClick={() => props.setActiveTeam(team)}
                  fontSize="1.5rem"
                >
                  {team.name}
                </Text>
                <IconButton
                  onClick={() => {
                    setIsOpen(true);
                    setClickedTeam(team);
                  }}
                  size="xs"
                  icon="small-close"
                />
              </Box>
            </>
          ))}
        <Button
          onClick={props.onOpen}
          w="50%"
          minW={'128px'}
          m="3% auto"
          rightIcon={'small-add'}
          color="#515052"
          backgroundColor="white"
          border="1px solid white"
          _hover={{ backgroundColor: 'blue.300', color: 'white' }}
        >
          Create a team
        </Button>
        {renderAlertDialogue()}
      </Stack>
    </Box>
  );
};

export default TeamSideBar;
