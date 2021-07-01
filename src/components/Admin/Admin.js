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
    return (
      <BounceLoader className={classes.pendingLoading} color="orangered" />
    );
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
        id={user.id}
        addPart={addPartner}
        removePend={removePendingPartner}
      ></PendingPartner>
    );
  });

  async function addPartner(username) {
    const response = await fetch(
      'https://mutvak-a2683-default-rtdb.europe-west1.firebasedatabase.app/Partner.json',
      {
        method: 'POST',
        body: JSON.stringify({ username: username }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  async function removePendingPartner(id) {
    const response = await fetch(
      `https://mutvak-a2683-default-rtdb.europe-west1.firebasedatabase.app/Pending/${id}.json`,
      {
        method: 'DELETE',
      }
    );
    window.location.reload();
  }

  return (
    <Fragment>
      <Header></Header>
      <h1 className={classes.adminPanel}>Admin Panel</h1>
      <section className={classes.pending}>
        <Card>{pendingList}</Card>
      </section>
    </Fragment>
  );
};

export default Admin;
