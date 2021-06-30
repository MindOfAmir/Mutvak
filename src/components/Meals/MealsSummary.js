import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Ukusna hrana na klik od vas!</h2>
      <p>
        Odaberite vašu omiljenu poslasticu iz našeg velikog izbora dostupnih
        jela i uživajte u ukusnom i svježem obroku
      </p>
      <p>
        Sva jela se spremaju od kvalitetnih sastojaka, uvijek sveže i kuhano od
        strane vrhunskih svjetski priznatih kuhara
      </p>
    </section>
  );
};

export default MealsSummary;
