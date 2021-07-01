import classes from './MealsSummary.module.css';
import { Button } from 'react-bootstrap';
import AuthContext from '../../store/auth-context';
import { useContext, useState, useRef } from 'react';
import React from 'react';
import Backdrop from '../UI/Backdrop';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';

const MealsSummary = () => {
  const itemNameRef = useRef();
  const itemDescriptionRef = useRef();
  const itemPriceRef = useRef();
  const [showItemForm, setShowItemForm] = useState(false);

  const showFormItemHandler = () => {
    setShowItemForm(prev => !prev);
  };
  const authCtx = useContext(AuthContext);

  authCtx.checkIsPartner(authCtx.username);
  console.log(authCtx.username);
  console.log(authCtx.isPartner);

  const addMealHandler = async (nam, desc, pri, randomNum) => {
    const response = await fetch(
      `https://mutvak-a2683-default-rtdb.europe-west1.firebasedatabase.app/meals.json`,
      {
        method: 'POST',
        body: JSON.stringify({
          name: nam,
          description: desc,
          price: pri,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    console.log(data);
    showFormItemHandler();
  };

  const submitHandler = async e => {
    e.preventDefault();

    const enteredName = itemNameRef.current.value;
    const enteredDescription = itemDescriptionRef.current.value;
    const enteredPriceTemp = itemPriceRef.current.value;
    const enteredPrice = +enteredPriceTemp;
    const randomNum = Math.trunc(Math.random() * 100);

    addMealHandler(enteredName, enteredDescription, enteredPrice, randomNum);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  return (
    <React.Fragment>
      {showItemForm &&
        ReactDOM.createPortal(
          <Backdrop CloseForm={showFormItemHandler} />,
          document.getElementById('backdrop-root')
        )}
      {showItemForm &&
        ReactDOM.createPortal(
          <div className={(classes.wrapper, classes.fadeInDown, classes.modal)}>
            <div className={classes.formContent}>
              <h2 className={classes.active}>Dodaj novi Artikal!</h2>

              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  id="name"
                  required
                  ref={itemNameRef}
                  className={(classes.fadeIn, classes.first)}
                  placeholder="Ime Artikla"
                ></input>
                <input
                  type="text"
                  id="description"
                  required
                  ref={itemDescriptionRef}
                  className={(classes.fadeIn, classes.first)}
                  placeholder="Kratki opis artikla"
                ></input>
                <input
                  type="text"
                  id="price"
                  required
                  ref={itemPriceRef}
                  className={(classes.fadeIn, classes.first)}
                  placeholder="Cijena ( U KM )"
                ></input>

                <input
                  type="submit"
                  className={(classes.fadeIn, classes.fourth)}
                  value={'Dodaj Artikal'}
                ></input>
              </form>
            </div>
          </div>,
          document.getElementById('overlay-root')
        )}

      <section className={classes.summary}>
        <h2>Ukusna hrana na klik od vas!</h2>
        <p>
          Odaberite vašu omiljenu poslasticu iz našeg velikog izbora dostupnih
          jela i uživajte u ukusnom i svježem obroku
        </p>
        <p>
          Sva jela se spremaju od kvalitetnih sastojaka, uvijek sveže i kuhano
          od strane vrhunskih svjetski priznatih kuhara
        </p>
        {authCtx.isPartner && (
          <Button variant="outline-success" onClick={showFormItemHandler}>
            Dodaj novi artikal
          </Button>
        )}
      </section>
    </React.Fragment>
  );
};

export default MealsSummary;
