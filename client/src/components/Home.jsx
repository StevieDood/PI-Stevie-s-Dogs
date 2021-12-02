import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs } from "../store/actions/index.js";
import { Link } from "react-router-dom";
import Dogs from "./Dogs.jsx";
import Paging from "./Paging.jsx";
import SearchBar from "./SearchBar.jsx";
import Filters from "./Filters.jsx";
import styles from "./Home.module.css";
import bone from "../assets/bone.png";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //conecto el estado del reducer para todos los perros
  const [order, setOrder] = useState(""); //estado local solo para orden!
  const [currentPage, setCurrentPage] = useState(1); //inicio de indice de paginado (pagina actual, cual es la pagina actual?)
  const [dogsPerPage, setDogsPerPage] = useState(8); //cantidad de perros por pagina
  const lastDogPerPage = currentPage * dogsPerPage; //defino el ultimo perro a mostrar por página
  const firstDogPerPage = lastDogPerPage - dogsPerPage; //defino el primer perro a mostrar por página
  const currentDogs = allDogs.slice(firstDogPerPage, lastDogPerPage); //obtengo del array total, solo los perros por página a mostrar
  const pages = (pageNumber) => {
    //constante para paginado
    setCurrentPage(pageNumber); //setea el numero dado a la pagina actual
    setDogsPerPage(dogsPerPage);
  };

  useEffect(() => {
    dispatch(fetchDogs());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(fetchDogs());
    setCurrentPage(1);
  }

  return (
    <div>
      <img src={bone} alt="" className={styles.bone1} data-testid="bone1" />
      <img src={bone} alt="" className={styles.bone2} />
      <div className={styles.title}>
        <h1>Stevie's Dogs</h1>
        <SearchBar setOrder={setOrder} setCurrentPage={setCurrentPage} />
        <Link to="/createDog" className={styles.addDogLink}>
          ...or Add a new breed :D !
        </Link>
      </div>

      <Filters setOrder={setOrder} setCurrentPage={setCurrentPage} />

      <button
        onClick={(e) => {
          handleClick(e);
        }}
        className={styles.reset}
      >
        {" "}
        Reset Filters
      </button>

      <Paging
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        pages={pages}
      />
      <Dogs currentDogs={currentDogs} />
    </div>
  );
}
