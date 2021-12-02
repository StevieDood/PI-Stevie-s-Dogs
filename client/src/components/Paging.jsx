import React from "react";
import styles from "./Paging.module.css";

export default function Paging({ dogsPerPage, allDogs, pages }) {
  const pageNumbers = []; //aqui se almacenan todos los numeros de pagina

  //se divide el total de perros entre 8, y cada numero de posicion es guardada en el total de paginas
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers?.map((number) => (
          <li key={number} className={styles.list}>
            {/* onclick pasa el numero actual la constante pages, que setea la pagina a mostrar, y la cantidad de perros a mostrar por pagina.
            Primero obtengo el indice del ultimo perro a mostrar:multiplicando la pagina actual por la cantidad de perros a mostrar
            Despues, obtengo el indice del primer perro a mostrar: restando del indice del ultimo perro, menos los perros por pagina
            Por ultimo, teniendo el primer y segundo indice, hago un slice dandole esos dos parametros y muestra los perros 
            */}
            <button onClick={() => pages(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
