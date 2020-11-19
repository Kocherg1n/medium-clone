import {createContext} from "react";
import React, {useState} from "react";

export const CurrentUserContext = createContext([{}, () => {}]);

export const CurrentUserProvider = ({children}) => {
  const [state, setState] = useState({
    isLoading: false,
    isLoggedIn: null,
    currentUser: null
  });

  window.store = state;

  return <CurrentUserContext.Provider value={[state, setState]}>
          {children}
        </CurrentUserContext.Provider>
};

