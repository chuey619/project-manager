import React from 'react';
import { Grid } from '@chakra-ui/core';
import { Navbar, Footer, TeamSideBar } from '../components';

function SideBar({ children }) {
  return (
    <Grid
      gridTemplateAreas={`
        "nav"
        "sidebar main"
        "footer"
      `}
      gridTemplateRows="[top] auto [main-start] 100vh [main-end] 10vh [bottom]"
      gridTemplateColumns=" 20vw [main-start] 80vw [main-end] "
      height="auto"
      justifyContent="center"
    >
      <Navbar />
      <TeamSideBar />
      {children}
      <Footer />
    </Grid>
  );
}

export default SideBar;
