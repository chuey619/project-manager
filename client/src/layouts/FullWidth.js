import React from 'react';
import { Grid } from '@chakra-ui/core';
import { Navbar, Footer } from '../components';

function FullWidth({ children }) {
  return (
    <Grid
      zIndex={2}
      gridTemplateAreas={`
        "nav"
        "main"
        "footer"
      `}
      gridTemplateRows="[top] auto [main-start] 100vh [main-end] 5vh [bottom]"
      gridTemplateColumns="[main-start] 100vw [main-end] "
      height="auto"
      justifyContent="center"
      boxShadow="0px -1px 13px 7px rgba(230,230,230,1)"
      minW="375px"
      overflow="auto"
    >
      <Navbar />
      {children}
      <Footer />
    </Grid>
  );
}

export default FullWidth;
