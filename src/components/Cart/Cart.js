import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { Checkmark } from 'react-checkmark';
import { useRef, useState } from 'react';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import { Redirect } from 'react-router';

const Cart = props => {
  const [showPaypal, setShowPaypal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const inputLocationRef = useRef();
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`.replace('.', ',');
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const [acceptedOrder, setAcceptedOrder] = useState(false);

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const AcceptedOrder = e => {
    setAcceptedOrder(true);
    setTimeout(() => {
      setRedirect(true);
    }, 3000);
  };
  if (acceptedOrder) {
    return (
      <Modal onClose={props.onClose}>
        {redirect && <Redirect to="/thank-you" />}
        <Checkmark />
        <p className={classes.approved}>Narudzba odobrena!</p>
      </Modal>
    );
  }

  const paymentChangeHandler = e => {
    if (e.target.value === 'PayPal') {
      setShowPaypal(true);
    } else {
      setShowPaypal(false);
    }
  };
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <input
        type="radio"
        id="paypal"
        name="payment"
        value="PayPal"
        onClick={paymentChangeHandler}
      />
      <label for="paypal" style={{ marginRight: '5px' }}>
        Paypal
      </label>
      <input
        type="radio"
        id="delivery"
        name="payment"
        value="delivery"
        onClick={paymentChangeHandler}
      ></input>
      <label for="delivery">Pri Pouzeću</label>

      {showPaypal && (
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_top"
        >
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="YX8ZLDBBHA8YA" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
            border="0"
            name="submit"
            alt="PayPal - The safer, easier way to pay online!"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      )}

      <input
        type="text"
        id="location"
        required
        ref={inputLocationRef}
        placeholder="Vaša lokacija"
        className={classes.locationInput}
      ></input>

      <div className={classes.total}>
        <span>Ukupno</span>
        <span> {totalAmount} KM </span>
      </div>

      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Zatvori
        </button>
        {hasItems && (
          <button className={classes.button} onClick={AcceptedOrder}>
            Naruči
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
