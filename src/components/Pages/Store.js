import Header from '../Layout/Header';
import Meals from '../Meals/Meals';
import Cart from '../Cart/Cart';
import { useState } from 'react';
import CartProvider from '../../store/CartProvider';
import { Button } from 'react-bootstrap';
function Store() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default Store;
