import React, { useState, useEffect } from 'react';
import Board from 'react-trello';
import { Box } from '@chakra-ui/core';

const ProjectBoard = (props) => {
  const data = props.lanes.data;

  return (
    <Box>
      <Board
        style={{
          boxShadow: ' 0px 0px 17px -1px rgba(173,173,173,1)',
          overflow: 'auto',
          borderRadius: '20px',
          padding: '20px',
          minHeight: '600px',
          height: 'auto',
          backgroundColor: '#63b3ed',
        }}
        onLaneDelete={props.onLaneDelete}
        onLaneAdd={props.onLaneAdd}
        onCardMoveAcrossLanes={props.onCardMoveAcrossLanes}
        onCardDelete={props.onCardDelete}
        onCardAdd={props.onCardAdd}
        editable={true}
        canAddLanes={true}
        editLaneTitle={false}
        data={data}
      />
    </Box>
  );
};

export default ProjectBoard;
