import classes from './PendingPartner.module.css';
import { Button } from 'react-bootstrap';

const PendingPartner = props => {
  const addPartnerHandler = () => {
    props.addPart(props.username);
    props.removePend(props.id);
  };

  const removePendingHandler = () => {
    props.removePend(props.id);
  };

  return (
    <li className={classes.partner}>
      <div>
        <h3>{props.username}</h3>
        <div className={classes.description}>{props.description}</div>
        <Button
          variant="outline-success"
          onClick={addPartnerHandler}
          className={classes.customBtn}
        >
          Prihavti
        </Button>
        <Button
          variant="outline-danger"
          onClick={removePendingHandler}
          className={classes.customBtn}
        >
          Odbij
        </Button>
      </div>
    </li>
  );
};

export default PendingPartner;
