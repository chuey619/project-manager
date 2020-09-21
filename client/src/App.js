import React from 'react';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { UserProvider, UserContext } from './contexts/userContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import customTheme from './theme';
import { FullWidth } from './layouts';
import { Home, Landing } from './pages';
function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return {
          ...state,
          user: action.user,
        };

      case 'logout':
        return {
          ...state,
          user: {},
        };

      default:
        return state;
    }
  };
  return (
    <UserProvider reducer={reducer}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Router>
          <Route
            exact
            path="/"
            render={() => (
              <FullWidth>
                <Landing />
              </FullWidth>
            )}
          />
          <Route
            exact
            path="/home"
            render={() => (
              <FullWidth>
                <Home />
              </FullWidth>
            )}
          />
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
