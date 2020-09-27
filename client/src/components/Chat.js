import React, { useEffect } from 'react';
import { Textarea } from '@chakra-ui/core';

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
    <div className="card">
      <form onSubmit={props.sendMessage}>
        <h1>Messenger</h1>
        <div>
          <Textarea
            name="message"
            onChange={(e) => props.onTextChange(e)}
            value={props.message}
            label="Message"
          />
        </div>
        <button>Send</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {props.renderChat()}
      </div>
    </div>
  );
};

export default Chat;
