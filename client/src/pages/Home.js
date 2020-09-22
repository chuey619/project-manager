import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/core';
import { TeamSideBar, HomeHeader, Projects } from '../components';
import { Redirect } from 'react-router-dom';
const Home = (props) => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTeam, setActiveTeam] = useState({});
  useEffect(() => {
    const getTeams = async () => {
      const res = await fetch('/teams');
      const json = await res.json();
      setTeams(json.data.teams);
    };
    props.user[0].user && getTeams();
  }, []);
  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch(`/teams/${activeTeam.id}`);
      const json = await res.json();
      setProjects(json?.data?.projects);
    };
    activeTeam && getProjects();
  }, [activeTeam]);
  return (
    <Box display="flex" borderRadius="20px" height={'80%'} width={'100%'}>
      {props.user[0].user === null && <Redirect to="/" />}
      <Box w={{ xs: '40%', sm: '40%', md: '40%', lg: '20%' }} h="100%" mr="5%">
        <TeamSideBar setActiveTeam={setActiveTeam} teams={teams} />
      </Box>
      <Box w="80%" h="80%">
        <HomeHeader name={props.user.username} />
        <Projects team={activeTeam} projects={projects} />
      </Box>
    </Box>
  );
};

export default Home;
