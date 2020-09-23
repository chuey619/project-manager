import React, { useState, useEffect } from 'react';
import { ProjectBoard, Chat } from '../components';
import { Box, Spinner, Heading, Text } from '@chakra-ui/core';

const ProjectPage = (props) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [data, setData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    const getData = async () => {
      let url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}`;
      let response = await fetch(url);
      let json = await response.json();
      setData(json);
      setDataLoaded(true);
    };
    getData();
  }, [shouldFetch]);
  const onLaneDelete = async (lane) => {
    const url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}/tasks/${lane}`;
    let response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const onLaneAdd = async (card, lane) => {
    const body = {
      title: 'Sample Card',
      description: 'This card is auto generated on creation of new lane.',
      category: card.title,
    };
    let url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}/tasks`;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    setShouldFetch(!shouldFetch);
  };
  const onCardAdd = async (card, lane) => {
    const body = {
      title: card.title,
      description: card.description,
      category: lane,
    };
    let url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}/tasks`;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    setShouldFetch(!shouldFetch);
  };

  const onCardDelete = async (cardId) => {
    const url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}/tasks/${cardId}`;
    let response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  const onCardMoveAcrossLanes = async (fromLane, toLane, cardId) => {
    console.log(cardId, fromLane, toLane);
    const url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}/tasks/${cardId}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category: toLane }),
    });
  };
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
      borderRadius="20px"
      height={{ base: '100%', lg: '80%', xl: '80%' }}
      width={'100%'}
    >
      <Box
        minW="225px"
        w={{ xs: '60%', sm: '40%', md: '40%', lg: '20%' }}
        h="100%"
        mr="5%"
        mb={{ xs: '5%', sm: '5%', md: '5%', lg: '0' }}
      >
        <Text mb="3%">Chat</Text>
        <Chat />
      </Box>
      <Box w={{ base: '100%', lg: '80%', xl: '80%' }} h="80%" mr="5%">
        <Heading mb="3%">{props.location.state.name}</Heading>
        {dataLoaded ? (
          <ProjectBoard
            onLaneDelete={onLaneDelete}
            onLaneAdd={onLaneAdd}
            onCardMoveAcrossLanes={onCardMoveAcrossLanes}
            onCardDelete={onCardDelete}
            onCardAdd={onCardAdd}
            lanes={data}
          />
        ) : (
          <Spinner />
        )}
      </Box>
    </Box>
  );
};

export default ProjectPage;
