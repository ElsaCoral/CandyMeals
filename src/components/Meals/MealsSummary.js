import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Deliciosa comida, Pensada para ti.</h2>
      <p>
        Elige tu comida favorita entre nuestra amplia selecciòn disponible 
        y disfruta en casa.
      </p>
      <p>
        Todas tus comidas se cocinan con ingredientes de alta calidad 
        y justo a tiempo!
      </p>
    </section>
  );
};

export default MealsSummary;
