import Header from '../Layout/Header';
import { Fragment, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Welcome.module.css';
import TextAnimation from 'react-animate-text';
import AuthForm from '../Auth/AuthForm';

const Welcome = () => {
  const [LoginFormShow, setLoginFormShow] = useState(false);

  const LoginFormShowHandler = () => {
    setLoginFormShow(prev => !prev);
  };

  return (
    <Fragment id="welcomeRoot">
      <Header openLogin={setLoginFormShow}></Header>

      <Container className={classes.centered}>
        {LoginFormShow && (
          <Row>
            <Col>
              <AuthForm onCloseForm={LoginFormShowHandler}></AuthForm>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <h1 className={classes.title}>
              <TextAnimation>Naruči, Napravi, Donesi!</TextAnimation>
            </h1>
            <h2 style={{ color: 'white' }}>Mutvak</h2>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card className={classes.customCard}>
              <Card.Body>
                <Card.Header className={classes.customHeader}>
                  Naruči
                </Card.Header>
                <Card.Text>
                  Nemate vremena da spremate ručak? Naručite omiljeni obrok,
                  uvijek svjež i spreman, na vašoj adresi!
                </Card.Text>
                <Button variant="outline-danger" onClick={LoginFormShowHandler}>
                  Napravi račun!
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className={classes.customCard}>
              <Card.Body>
                <Card.Header className={classes.customHeader}>
                  Partnerstvo
                </Card.Header>
                <Card.Text>
                  Volite da spremate hranu u slobodno vrijeme? Imate dovoljno
                  godina iskustva u kulinarstvu? Postanite dio našeg tima i
                  radite ono što volite!
                </Card.Text>
                <Button variant="outline-danger">Prijavi se!</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Welcome;
