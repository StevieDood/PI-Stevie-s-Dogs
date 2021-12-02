import React from "react";
import Dog from "./Dog.jsx";
import styles from "./Dogs.module.css";
import paw from "../assets/giphy.gif";

//funcion para renderizar cada dog card, recibe los perros a mostrar por pagina de currentDogs
export default function Dogs({ currentDogs }) {
  return (
    <div className={styles.container}>
      {currentDogs?.map((dog) => {
        return (
          <Dog
            image={dog.image}
            name={dog.name}
            temperament={dog.temperament}
            min_weight={dog.min_weight}
            max_weight={dog.max_weight}
            id={dog.id}
            key={dog.id}
          />
        );
      })}
      <img src={paw} alt="" className={styles.fixed} />
    </div>
  );
}
