import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreated,
  filterAlphabetical,
  filterWeight,
  getTemps,
  filterByTemp,
} from "../store/actions/index.js";
import styles from "./Filters.module.css";

export default function Filters({ setOrder, setCurrentPage }) {
  const dispatch = useDispatch();
  const allTemps = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleFilterAlphabetical(e) {
    dispatch(filterAlphabetical(e.target.value));
    setCurrentPage(1); //devuelve el paginado a la pagina 1 para rerenderizar
    setOrder(`Order ${e.target.value}`); //seteo de estado local para orden!
  }

  function handleFilterWeight(e) {
    dispatch(filterWeight(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  function handleFilterTemp(e) {
    dispatch(filterByTemp(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  return (
    <div className={styles.container}>
      <h1>F i l t e r s</h1>

      <label className={styles.label}>Breeds</label>
      <select
        onChange={(e) => handleFilterCreated(e)}
        className={styles.select}
      >
        <option value="" disabled>
          Choose one...
        </option>
        <option value="Exists">Existing</option>
        <option value="Created">New entries</option>
      </select>

      <label className={styles.label}> Temperament</label>
      <select onChange={(e) => handleFilterTemp(e)} className={styles.select}>
        <>
          <option value="" disabled>
            Choose one...
          </option>

          {allTemps.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </>
      </select>

      <label className={styles.label}> Alphabetical order</label>
      <select
        onChange={(e) => handleFilterAlphabetical(e)}
        className={styles.select}
      >
        <option value="" disabled>
          Choose one...
        </option>
        <option value="Asc">A-Z</option>
        <option value="Desc">Z-A</option>
      </select>

      <label className={styles.label}> Order by weight</label>
      <select onChange={(e) => handleFilterWeight(e)} className={styles.select}>
        <option value="" disabled>
          Choose one...
        </option>
        <option value="Asc">Heaviest - Lightest </option>
        <option value="Desc">Lightest - Heaviest </option>
      </select>
    </div>
  );
}
