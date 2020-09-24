import React, { useState, useEffect } from 'react';
import { Box, useDisclosure } from '@chakra-ui/core';
import {
  TeamSideBar,
  HomeHeader,
  Projects,
  NewTeam,
  NewProject,
} from '../components';
import { Redirect } from 'react-router-dom';
const Home = (props) => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTeam, setActiveTeam] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [shouldFetchTeams, setShouldFetchTeams] = useState(false);
  const [shouldFetchProjects, setShouldFetchProjects] = useState(false);
  useEffect(() => {
    const getTeams = async () => {
      const res = await fetch('/teams');
      const json = await res.json();
      setTeams(json.data.teams);
    };
    props.user[0]?.user && getTeams();
  }, [shouldFetchTeams]);
  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch(`/teams/${activeTeam.id}`);
      const json = await res.json();
      setProjects(json?.data?.projects);
    };
    activeTeam && getProjects();
  }, [activeTeam, shouldFetchProjects]);
  return (
    <Box display="flex" borderRadius="20px" height={'80%'} width={'100%'}>
      {props.user[0]?.user === null && <Redirect to="/" />}
      <NewTeam
        shouldFetchTeams={shouldFetchTeams}
        setShouldFetchTeams={setShouldFetchTeams}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        team={activeTeam}
      />

      <Box
        minW="225px"
        w={{ xs: '40%', sm: '40%', md: '40%', lg: '20%' }}
        h="100%"
        mr="5%"
      >
        <TeamSideBar
          onOpen={onOpen}
          setActiveTeam={setActiveTeam}
          teams={teams}
        />
      </Box>
      <Box w="80%" h="80%">
        <HomeHeader name={props.user[0]?.user?.username} />
        <Projects
          user={props.user[0]}
          team={activeTeam}
          projects={projects}
          shouldFetchProjects={shouldFetchProjects}
          setShouldFetchProjects={setShouldFetchProjects}
        />
      </Box>
    </Box>
  );
};

export default Home;
