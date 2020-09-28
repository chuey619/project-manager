import React from 'react';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { UserProvider, UserContext } from './contexts/userContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import customTheme from './theme';
import { FullWidth } from './layouts';
import { Home, Landing, ProjectPage, About } from './pages';
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
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <FullWidth>
                      <Landing user={value} />
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
                <Route
                  exact
                  path="/about"
                  render={(props) => (
                    <FullWidth>
                      <About />
                    </FullWidth>
                  )}
                />
                <Route
                  path="/:team_name/:project_name"
                  render={(props) => (
                    <FullWidth>
                      <ProjectPage {...props} user={value} />
                    </FullWidth>
                  )}
                />
              </Switch>
            )}
          </UserContext.Consumer>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
