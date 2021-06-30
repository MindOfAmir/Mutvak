import classes from './PendingPartner.module.css';

const PendingPartner = props => {
  return (
    <li className={classes.partner}>
      <div>
        <h3>{props.username}</h3>
        <div className={classes.description}>{props.description}</div>
      </div>
    </li>
  );
};

export default PendingPartner;
