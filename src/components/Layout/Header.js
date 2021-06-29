import { Fragment } from 'react';
import mealsImage from '../Meals/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import { useLocation } from 'react-router';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';

const Header = props => {
  const authCtx = useContext(AuthContext);
  const currentlyIsLoggedIn = authCtx.isLoggedIn;
  console.log(currentlyIsLoggedIn);

  const currentRoute = useLocation();
  console.log(currentRoute);

  const isCurrentLocationStore =
    currentRoute.pathname === '/store' ? true : false;

  const logoutHandler = () => {
    authCtx.isLoggedIn = false;
    authCtx.logout();
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Mutvak</h1>
        {isCurrentLocationStore && (
          <HeaderCartButton onClick={props.onShowCart} />
        )}
        {currentlyIsLoggedIn ? (
          <Button
            variant="outline-danger primary"
            className={classes.btnCustom}
            onClick={logoutHandler}
          >
            <Link to="/"> Odjavi se </Link>
          </Button>
        ) : (
          <Button
            variant="outline-danger primary"
            className={classes.btnCustom}
            onClick={props.openLogin}
          >
            Prijavi se
          </Button>
        )}
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="Meals" />
      </div>
    </Fragment>
  );
};

export default Header;
