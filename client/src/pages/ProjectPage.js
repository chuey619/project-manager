import React, { useState, useEffect, useRef } from 'react';
import { ProjectBoard, Chat } from '../components';
import { Box, Spinner, Heading, Text } from '@chakra-ui/core';
import io from 'socket.io-client';
const ProjectPage = (props) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [data, setData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io.connect('/');
    socketRef.current.emit('join_room', props.location.state.name);
    socketRef.current.on('message', (message) => {
      console.log(message);
      receivedMessage(message.message);
    });
  }, []);
  useEffect(() => {
    socketRef.current.on('card_change', () => {
      setShouldFetch(!shouldFetch);
    });
  }, [dataLoaded]);

  useEffect(() => {
    const getData = async () => {
      let url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}`;
      let response = await fetch(url);
      let json = await response.json();
      setData(json);
      setDataLoaded(false);
      setDataLoaded(true);
    };
    getData();
  }, [shouldFetch]);
  const receivedMessage = (message) => {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  };

  const onLaneDelete = async (lane) => {
    const url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}/tasks/${lane}`;
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    socketRef.current.emit('card_change', props.location.state.name);
  };
  const onLaneAdd = async (card, lane) => {
    const body = {
      title: 'Sample Card',
      description: 'This card is auto generated on creation of new lane.',
      category: card.title,
    };
    let url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}/tasks`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    socketRef.current.emit('card_change', props.location.state.name);
  };
  const onTextChange = (e) => {
    setMessage(e.target.value);
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    const url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}/messages`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    });
    setMessage('');
    socketRef.current.emit('message', {
      message: { body: message, sender: props.user[0].user.name },
      room: props.location.state.name,
    });
  };
  const renderChat = () => {
    return messages.map((message, index) => (
      <div key={index}>
        <h3>
          {message.sender}: {message.body}
        </h3>
      </div>
    ));
  };

  const onCardAdd = async (card, lane) => {
    const body = {
      title: card.title,
      description: card.description,
      category: lane,
    };
    let url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}/tasks`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    socketRef.current.emit('card_change', props.location.state.name);
  };
  const onCardDelete = async (cardId) => {
    const url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}/tasks/${cardId}`;
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    socketRef.current.emit('card_change', props.location.state.name);
  };
  const onCardMoveAcrossLanes = async (fromLane, toLane, cardId) => {
    console.log(cardId, fromLane, toLane);
    const url = `/teams/${props.location.state.team_id}/projects/${props.location.state.id}/tasks/${cardId}`;
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category: toLane }),
    });
    socketRef.current.emit('card_change', props.location.state.name);
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
        <Chat
          renderChat={renderChat}
          sendMessage={sendMessage}
          setMessages={setMessages}
          onTextChange={onTextChange}
          team_id={props.location.state.team_id}
          project_id={props.location.state.id}
          room={props.location.state.name.replace(' ', '-')}
          socketRef={socketRef}
          message={message}
        />
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
