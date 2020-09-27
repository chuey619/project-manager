import React from 'react';
import Board from 'react-trello';

const ProjectBoard = (props) => {
  const data = props.lanes.data;

  return (
    <Board
      style={{
        overflow: 'auto',
        p: '20px',
        height: '100%',
        w: '100%',

        backgroundColor: '#63b3ed',
      }}
      onLaneDelete={props.onLaneDelete}
      onLaneAdd={props.onLaneAdd}
      onCardMoveAcrossLanes={props.onCardMoveAcrossLanes}
      onCardDelete={props.onCardDelete}
      onCardAdd={props.onCardAdd}
      editable={true}
      draggable={true}
      canAddLanes={true}
      data={data}
      laneStyle={{
        maxHeight: '80%',
        borderRadius: '25px',
        backgroundColor: '#1E212B',
        color: 'white',
      }}
      cardStyle={{ color: '#515052' }}
    />
  );
};

export default ProjectBoard;
