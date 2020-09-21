import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { isEmpty } from '../util';

export const UserContext = createContext(null);

const initialValue = {
  user: null,
};

export const UserProvider = ({ reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    fetch(`/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('Ran Me Query');
        if (!isEmpty(res?.data?.user)) {
          dispatch({
            type: 'login',
            user: res?.data?.user,
          });
        }
      });
  }, []);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
