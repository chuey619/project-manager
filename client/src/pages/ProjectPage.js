import React, { useState, useEffect, useRef } from 'react';
import { ProjectBoard, Chat } from '../components';
import { Box, Spinner, Text } from '@chakra-ui/core';

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
      receivedMessage(message.message);
    });
    socketRef.current.on('card_change', () => {
      recievedCardChange();
    });
    return () => {
      socketRef.current.off('card_change');
    };
  }, []);
  const recievedCardChange = () => {
    setShouldFetch((shouldFetch) => !shouldFetch);
  };
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
  const userIsSender = (message) => {
    return message.sender === props.user[0]?.user?.name;
  };
  const renderChat = () => {
    return (
      <Box overflowX="auto" d="flex" flexDirection="column" minH="200px">
        {messages.map((message, index) => (
          <Box
            w="60%"
            maxW="60%"
            ml={userIsSender(message) ? '40%' : '0'}
            key={index}
          >
            {console.log(message, props.user.name)}
            <Box
              display="flex"
              flexDirection="column"
              mr="3%"
              w="auto"
              textAlign={userIsSender(message) ? 'end' : 'start'}
            >
              <Text mb="2%">{!userIsSender(message) && message.sender}</Text>
              <Text
                w="auto"
                d="inline-block"
                p={'2% 10%'}
                borderRadius="10px"
                backgroundColor={
                  userIsSender(message) ? 'lightgrey' : '#63b3ed'
                }
              >
                {message.body}
              </Text>
              <Text as="i" fontSize="xs">
                {message.sent_on && message.sent_on.split('T')[0]}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    );
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
    <Box backgroundColor="white" display="flex" height={'100%'} width={'100%'}>
      <Box
        minW="190px"
        w={{ xs: '40%', sm: '40%', md: '40%', lg: '25%' }}
        h="100%"
      >
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
      <Box w="100%" h="100%">
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
