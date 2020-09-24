import React from 'react';
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

export {
  onCardAdd,
  onCardDelete,
  onCardMoveAcrossLanes,
  onLaneAdd,
  onLaneDelete,
};
