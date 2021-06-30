import { Fragment, useEffect, useState } from 'react';
import Header from '../Layout/Header';
import classes from './Admin.module.css';
import Card from '../UI/Card';
import { BounceLoader } from 'react-spinners';
import PendingPartner from './PendingPartner';

const Admin = () => {
  const [pending, setPending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(async () => {
    const fetchPending = async () => {
      const response = await fetch(
        'https://mutvak-a2683-default-rtdb.europe-west1.firebasedatabase.app/Pending.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();

      const loadedPending = [];

      for (const key in responseData) {
        loadedPending.push({
          id: key,
          username: responseData[key].username,
          description: responseData[key].comment,
        });
      }
      setPending(loadedPending);
      setIsLoading(false);
    };
    fetchPending().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <BounceLoader className={classes.pendingLoading} />;
  }
  if (httpError) {
    return (
      <section className={classes.pendingError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const pendingList = pending.map(user => {
    console.log(user.username);
    return (
      <PendingPartner
        username={user.username}
        description={user.description}
      ></PendingPartner>
    );
  });
  return (
    <Fragment>
      <Header></Header>
      <section className={classes.pending}>
        <Card>{pendingList}</Card>
      </section>
    </Fragment>
  );
};

export default Admin;
