import { useEffect, useState, useCallback } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchMeals = useCallback(async (err = false) => {
    setIsLoading(true);
    const url = err
      ? "https://react-http-d1a08-default-rtdb.europe-west1.firebasedatabase.app/meals"
      : "https://react-http-d1a08-default-rtdb.europe-west1.firebasedatabase.app/meals.json";
    const fetchObj = err ? { mode: "no-cors" } : {};

    const response = await fetch(url, fetchObj);

    if (!response.ok) {
      throw new Error(`Algo saliò mal,
       Por favor, vuelva a intentarlo.`);
    }

    const responseData = await response.json();

    const loadedMeals = [];

    for (const key in responseData) {
      loadedMeals.push({ id: key, ...responseData[key] });
    }
    setMeals(loadedMeals);
    setIsLoading(false);
    setHttpError(false);
  }, []);

  useEffect(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false);
      console.error(error, error.message);
      setHttpError(error.message);
    });
  }, [fetchMeals]);

  const clickHandler = useCallback(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [fetchMeals]);

  if (isLoading) {
    return (
      <section className={classes.mealsIsLoading}>
        <p>Cargando...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
        <button onClick={clickHandler}>Intèntalo de nuevo</button>
      </section>
    );
  }

const comida= [

  {
    id: Math.random(),
    nombre: "Malteada de Fresa.",
    description:"Batido de leche, elaborado a base de helado.",
    price: 75,
  },
  {
    id: Math.random(),
    nombre: "Malteada de Vainilla.",
    description:"Batido de leche, elaborado a base de helado.",
    price: 75,
  },

  {
    id: Math.random(),
    nombre: "Malteada de Chocolate.",
    description:"Batido de leche, elaborado a base de helado.",
    price: 80,
  },
  {
    id: Math.random(),
    nombre: "Pumpkin Spice.",
    description:"Mezcla perfecta de cafè y canela con suaves matices  a calabaza y nuez moscada.",
    price: 85,
  },
  {
    id: Math.random(),
    nombre: "Club Sandwich.",
    description:"Pan de la casa tostado relleno de pechuga de pollo, acompañado de verduras o papas a elecciòn.",
    price: 125,
  }
]

  const mealsList = comida.map((comida) => (
    <MealItem
        
      key={comida.id}
      id={comida.id}
      name= {comida.nombre}
      description={comida.description}
      price={comida.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
