import classes from './PartnerForm.module.css';
import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../UI/Backdrop';
import { Button } from 'react-bootstrap';
import { BounceLoader } from 'react-spinners';
import { Checkmark } from 'react-checkmark';

const postData = async (username, comment) => {
  const randomNumb = Math.trunc(Math.random() * 100);
  const string = `P${randomNumb}`;
  const response = await fetch(
    `https://mutvak-a2683-default-rtdb.europe-west1.firebasedatabase.app/Pending/${string}.json`,
    {
      method: 'PUT',
      body: JSON.stringify({ username: `${username}`, comment: `${comment}` }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

const PartnerForm = props => {
  const usernameInputRef = useRef();
  const commentInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pending, setPending] = useState([]);

  const buttonAnimate = (load, auth) => {
    if (load) {
      return <BounceLoader color="orangered" size="30" />;
    } else if (auth) {
      return <Checkmark className={classes.chckMark} />;
    } else {
      return (
        <Button
          variant="outline-danger"
          className={classes.closeBtn}
          onClick={props.onCloseForm}
        >
          Zatvori
        </Button>
      );
    }
  };

  const submitHandler = e => {
    e.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    postData(enteredUsername, enteredComment);
  };

  // pocetak fetcha
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop CloseForm={props.onCloseForm} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <div className={(classes.wrapper, classes.fadeInDown, classes.modal)}>
          <div className={classes.formContent}>
            <h2 className={classes.active}>Podnesi Zahtjev</h2>

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
                type="text"
                id="comment"
                required
                ref={commentInputRef}
                className={(classes.fadeIn, classes.first)}
                placeholder="Vaš opis"
              ></input>
              <input
                type="submit"
                className={(classes.fadeIn, classes.fourth)}
                value={'Podnesi Zahtjev'}
              ></input>
              {buttonAnimate(isLoading, isAuthorized)}
            </form>
          </div>
        </div>,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
};

export default PartnerForm;
