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
      overflowX="hidden"
      gridTemplateRows="[top] auto [main-start] 88vh [main-end] 5vh [bottom]"
      gridTemplateColumns="[main-start] 100vw [main-end] "
      height="auto"
      justifyContent="center"
      minW="375px"
    >
      <Navbar />
      {children}
      <Footer />
    </Grid>
  );
}

export default FullWidth;
