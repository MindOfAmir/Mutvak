import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { Checkmark } from 'react-checkmark';
import { useState } from 'react';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = props => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)} KM`;
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
  };
  if (acceptedOrder) {
    return (
      <Modal onClose={props.onClose}>
        <Checkmark />
        <p className={classes.approved}>Narudzba odobrena!</p>
      </Modal>
    );
  }
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Ukupno</span>
        <span>{totalAmount}</span>
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
