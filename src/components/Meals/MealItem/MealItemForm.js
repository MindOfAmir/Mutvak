import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef } from 'react';
import { useState } from 'react';

const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amoutInputRef = useRef();
  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amoutInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amoutInputRef}
        label="Kolicina"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Dodaj</button>
      {!amountIsValid && (
        <p>Molimo vas unesite odobrenu vrijednost (1-5)! 🙌</p>
      )}
    </form>
  );
};

export default MealItemForm;
