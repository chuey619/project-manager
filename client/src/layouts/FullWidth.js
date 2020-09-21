import React from 'react';
import { Grid } from '@chakra-ui/core';
import { Navbar, Footer } from '../components';

function FullWidth({ children }) {
  return (
    <Grid
      gridTemplateAreas={`
        "nav"
        "main"
        "footer"
      `}
      gridTemplateRows="[top] auto [main-start] 100vh [main-end] 10vh [bottom]"
      gridTemplateColumns="[main-start] 80vw [main-end] "
      height="auto"
      justifyContent="center"
    >
      <Navbar />
      {children}
      <Footer />
    </Grid>
  );
}

export default FullWidth;
