import React from "react";
import styles from "./Dog.module.css";
import { useHistory } from "react-router-dom";

export default function Dog({
  image,
  name,
  temperament,
  min_weight,
  max_weight,
  id,
}) {
  const history = useHistory();
  //funcion para dirigir a la ruta de detalle
  const redirect = (e) => {
    e.preventDefault();
    history.push(`/home/${id}`);
  };
  return (
    <div className={styles.card} onClick={redirect}>
      {/* se puede reemplazar jpg por un png, pero cae en bucle infinito si tampoco tiene esa imagen*/}
      <img
        src={image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://i.pinimg.com/564x/09/71/4e/09714eab27b1ba108aa23eaa9f8d7b60.jpg";
        }}
        alt=""
        data-testid="image"
      />
      <h1 data-testid="name">{name}</h1>
      <h3 data-testid="temp">
        {/*Los temps llegan de la db como arrays, hay que extraerlos para mostrarlos correctamente, de la api llegan directamente comos strings*/}
        Temperaments:{" "}
        {Array.isArray(temperament) ? temperament.join(", ") : temperament}
      </h3>
      <h3>
        Weight: {min_weight} kgs(min) - {max_weight} kgs(max)
      </h3>
    </div>
  );
}
