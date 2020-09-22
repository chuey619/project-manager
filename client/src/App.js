import React from 'react';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { UserProvider, UserContext } from './contexts/userContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import customTheme from './theme';
import { FullWidth, SideBar } from './layouts';
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
          <UserContext.Consumer>
            {(value) => (
              <>
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
                      <Home user={value} />
                    </FullWidth>
                  )}
                />
              </>
            )}
          </UserContext.Consumer>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
