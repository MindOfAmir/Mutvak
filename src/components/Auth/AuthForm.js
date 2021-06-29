import { Fragment } from 'react';
import classes from './AuthForm.module.css';
import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../UI/Backdrop';
import { Button } from 'react-bootstrap';
import { BounceLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';

const AuthForm = props => {
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin(prevstate => !prevstate);
  };

  const submitHandler = e => {
    e.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // pocetak fetcha
    setIsLoading(true);
    let url;

    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_1cTxDn-F-jK71mCkqlFJnTl0BvHlaVc';
      //DODAJ API KEY
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_1cTxDn-F-jK71mCkqlFJnTl0BvHlaVc';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        setIsLoading(false);
        if (res.ok) {
          authCtx.isLoggedIn = true;
          setRedirect(true);
          return res.json();
        } else {
          return res.json().then(data => {
            let errorMessage = 'Authentication failed!';

            throw new Error(errorMessage);
          });
        }
      })
      .then(data => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        console.log('blabla', authCtx);
        authCtx.login(data.idToken, expirationTime.toISOString());
        // baci na store
      })
      .catch(err => {
        alert(err.message);
      });
  };
  return (
    <React.Fragment>
      {redirect ? <Redirect to="/store"></Redirect> : ''}
      {ReactDOM.createPortal(
        <Backdrop CloseForm={props.onCloseForm} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <div className={(classes.wrapper, classes.fadeInDown, classes.modal)}>
          <div className={classes.formContent}>
            <h2
              className={
                isLogin
                  ? classes.active
                  : (classes.inactive, classes.underlineHover)
              }
              onClick={switchAuthModeHandler}
            >
              Prijavi se
            </h2>
            <h2
              className={
                !isLogin
                  ? classes.active
                  : (classes.inactive, classes.underlineHover)
              }
              onClick={switchAuthModeHandler}
            >
              Napravi Račun
            </h2>

            <form onSubmit={submitHandler}>
              <input
                type="text"
                id="username"
                required
                ref={usernameInputRef}
                className={(classes.fadeIn, classes.first)}
                placeholder="Vaše korisničko Ime"
              ></input>
              <input
                type="email"
                id="email"
                required
                ref={emailInputRef}
                className={(classes.fadeIn, classes.first)}
                placeholder="Vaš Email"
              ></input>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
                className={(classes.fadeIn, classes.first)}
                placeholder="Vaša Zaporka"
              ></input>

              <input
                type="submit"
                className={(classes.fadeIn, classes.fourth)}
                value={isLogin ? 'Prijavi se' : 'Napravi račun'}
              ></input>
              {isLoading ? (
                <BounceLoader color="orangered" size="30" />
              ) : (
                <Button
                  variant="outline-danger"
                  className={classes.closeBtn}
                  onClick={props.onCloseForm}
                >
                  Zatvori
                </Button>
              )}
            </form>
          </div>
        </div>,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
};

export default AuthForm;
