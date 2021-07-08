import { Fragment } from 'react';
import Header from '../Layout/Header';
import classes from './Thankyou.module.css';
import Card from '../UI/Card';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

const Thankyou = () => {
  return (
    <Fragment>
      <Header></Header>
      <h1 className={classes.main}>Hvala vam na povjerenju!</h1>
      <Container className={classes.pending}>
        <Card className={classes.description}>
          <p className={classes.descriptionText}>
            Vaša narudžba je na putu prema vama
          </p>
          <Link to="/store" align="center">
            <Button
              variant="outline-success"
              className={classes.descriptionBtn}
            >
              Nazad
            </Button>
          </Link>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Thankyou;
