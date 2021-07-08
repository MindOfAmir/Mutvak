import { Fragment } from 'react';
import Header from '../Layout/Header';
import Card from '../UI/Card';
import classes from './Recovery.module.css';
import ReactDOM from 'react-dom';
import Backdrop from '../UI/Backdrop';
import { useRef, useState } from 'react';
import { Checkmark } from 'react-checkmark';
import { Redirect } from 'react-router';

const Recovery = () => {
  const emailInputRef = useRef();
  const [isDone, setIsDone] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const submitHandler = e => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    console.log(enteredEmail);

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB_1cTxDn-F-jK71mCkqlFJnTl0BvHlaVc',
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          requestType: 'PASSWORD_RESET',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => {
        console.log(res);
        setIsDone(true);
        setTimeout(() => {
          setRedirect(true);
        }, 3000);
      })
      .catch(error => alert(error));
  };
  return (
    <Fragment>
      {redirect && <Redirect to="/" />}
      <Header></Header>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <div className={(classes.wrapper, classes.fadeInDown, classes.modal)}>
          <div className={classes.formContent}>
            <h2 className={classes.active}>Povratak Zaporke</h2>
            <form onSubmit={submitHandler}>
              <input
                type="email"
                id="email"
                required
                ref={emailInputRef}
                className={(classes.fadeIn, classes.first)}
                placeholder="Vaš Email"
              ></input>

              <input
                type="submit"
                className={(classes.fadeIn, classes.fourth)}
                value={'Pošalji zahtjev'}
              ></input>
              {isDone && (
                <div>
                  {' '}
                  <Checkmark></Checkmark> <p>Provjerite vaš Email!</p>{' '}
                </div>
              )}
            </form>
          </div>
        </div>,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default Recovery;
