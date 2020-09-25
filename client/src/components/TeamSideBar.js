import React, { useState, useRef } from 'react';
import { ManageTeam } from './index';
import {
  Text,
  Box,
  Stack,
  Button,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/core';

const TeamSideBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedTeam, setClickedTeam] = useState();
  const cancelRef = useRef();
  const onClose = () => {
    setIsOpen(false);
  };
  const leaveTeam = async (teamId) => {
    const url = `/teams/${teamId}/members/${props.username}`;
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    props.setShouldFetchTeams(!props.shouldFetchTeams);
  };
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
            <ManageTeam
              team={team}
              key={i * 2}
              setActiveTeam={props.setActiveTeam}
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
                  onClick={() => props.setActiveTeam(team)}
                  fontWeight="bold"
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
              <AlertDialog
                key={i}
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay />
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Leave team
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      variantColor="red"
                      onClick={() => {
                        onClose();
                        leaveTeam(clickedTeam.id);
                      }}
                      ml={3}
                    >
                      Leave
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ))}
        <Button
          onClick={props.onOpen}
          variant="outline"
          variantColor="blue.300"
          color="#63B3ED"
        >
          Create a team
        </Button>
      </Stack>
    </Box>
  );
};

export default TeamSideBar;
