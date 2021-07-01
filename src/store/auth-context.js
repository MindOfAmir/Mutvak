import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {},
  username: '',
  isPartner: false,
});

const calculateRemainingTime = expirationTime => {
  const currentTime = new Date().getTime();
  const tempExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = tempExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 36000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
  };
};
export const AuthContextProvider = props => {
  const [user, setUser] = useState('');

  const tokenData = retrieveStoredToken();

  let initalToken;
  if (tokenData) {
    initalToken = tokenData.token;
  }

  const [token, setToken] = useState(initalToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);

    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const [isPartner, setIsPartner] = useState(false);

  const fetchPartners = async uname => {
    const response = await fetch(
      'https://mutvak-a2683-default-rtdb.europe-west1.firebasedatabase.app/Partner.json'
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const responseData = await response.json();

    for (const key in responseData) {
      if (responseData[key].username === uname) {
        setIsPartner(true);
      }
    }
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    setUsername: setUser,
    username: user,
    checkIsPartner: fetchPartners,
    isPartner: isPartner,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
