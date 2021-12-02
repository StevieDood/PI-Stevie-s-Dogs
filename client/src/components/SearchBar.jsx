import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../store/actions/index.js";
import styles from "./SearchBar.module.css";
import dogTitle from "../assets/HomeTitleDogo.png";

export default function SearchBar({ setOrder, setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchByName(name));
    setName("");
    setCurrentPage(1); //devuelve el paginado a la pagina 1 para rerenderizar
    setOrder(`Order ${e.target.value}`); //seteo de estado local para orden!
  }

  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        placeholder="  Find a breed..."
        onChange={(e) => handleInputChange(e)}
        value={name || ""}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
      <img src={dogTitle} alt="" className={styles.dogTitle} />
    </div>
  );
}
