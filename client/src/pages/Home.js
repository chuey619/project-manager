import React, { useState, useEffect } from 'react';
import { Box, useDisclosure } from '@chakra-ui/core';
import { TeamSideBar, HomeHeader, Projects, NewTeam } from '../components';
import { Redirect } from 'react-router-dom';
const Home = (props) => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTeam, setActiveTeam] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [members, setMembers] = useState([]);
  const [shouldFetchTeams, setShouldFetchTeams] = useState(false);
  const [shouldFetchProjects, setShouldFetchProjects] = useState(false);
  useEffect(() => {
    const getTeams = async () => {
      const res = await fetch('/teams');
      const json = await res.json();
      setTeams(json.data?.teams);
    };

    props.user[0]?.user && getTeams();
  }, [shouldFetchTeams]);
  useEffect(() => {
    const getTeamData = async () => {
      const res = await fetch(`/teams/${activeTeam.id}`);
      const json = await res.json();
      setProjects(json.data?.projects);
      setMembers(json.data?.members);
    };
    activeTeam !== {} && getTeamData();
  }, [activeTeam, shouldFetchProjects]);
  return (
    <Box backgroundColor="white" display="flex" height={'100%'} width={'100%'}>
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
        minW="190px"
        w={{ xs: '40%', sm: '40%', md: '40%', lg: '25%' }}
        h="100%"
        mr="5%"
      >
        <TeamSideBar
          username={props.user[0]?.user?.username}
          onOpen={onOpen}
          setActiveTeam={setActiveTeam}
          teams={teams}
          setShouldFetchTeams={setShouldFetchTeams}
          shouldFetchTeams={shouldFetchTeams}
          setShouldFetchProjects={setShouldFetchProjects}
          shouldFetchProjects={shouldFetchProjects}
          members={members}
        />
      </Box>
      <Box overflow="auto" w="80%" h="100%">
        <HomeHeader name={props.user[0]?.user?.username} />
        <Projects
          members={members}
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
