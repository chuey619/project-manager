import React, { useEffect } from 'react';
import { Input, Box, IconButton, Stack, Heading } from '@chakra-ui/core';

const Chat = (props) => {
  useEffect(() => {
    const getMessages = async () => {
      const url = `/teams/${props.team_id}/projects/${props.project_id}/messages`;
      const response = await fetch(url);
      const json = await response.json();
      props.setMessages(json.data);
    };

    getMessages();
  }, []);
  return (
    <Box d="flex" w="100%" flexDirection="column" h="100%" bg="#1E212B">
      <Heading color="white">{props.projectName}</Heading>
      <Stack
        border="1px solid white"
        borderRadius="25px"
        backgroundColor="white"
        minH="200px"
        w="95%"
        m="1% auto"
        maxH="100%"
        p={4}
      >
        {props.renderChat()}
        <form justifySelf="flex-end" onSubmit={props.sendMessage}>
          <Box
            borderRadius="10px"
            border="1px solid #1E212B"
            d="flex"
            justifyContent="space-between"
            backgroundColor="white"
            p={1}
          >
            <Input
              size="sm"
              style={{}}
              name="message"
              onChange={(e) => props.onTextChange(e)}
              value={props.message}
              label="Message"
              w="80%"
              h="100%"
              border="0"
              _active={{ border: '0' }}
              _focus={{ border: '0' }}
              placeholder="Say something!"
            />
            <IconButton size="xs" type="submit" icon="arrow-forward" />
          </Box>
        </form>
      </Stack>
    </Box>
  );
};

export default Chat;
