import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemps } from "../store/actions/index.js";
import styles from "./CreateDog.module.css";

export default function CreateDog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temps = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    lifespan: "",
    temperament: [],
    image: "",
  });
  //obtengo todos temps para listarlos
  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  //funcion seteadora de inputs y validadora por campo, tomando el name del input y asignandole a el mismo value
  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  //funcion para setear el temperamento por select
  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  //funcion para el envio del form, con validate anidado
  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate(input);

    if (Object.keys(isValid).length < 1) {
      dispatch(postDog(input));
      alert("Succesful entry!");
      setInput({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        lifespan: "",
        temperament: [],
        image: "",
      });
      history.push("/home");
    } else {
      alert("Unsuccesful entry, try again!");
      setInput({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        lifespan: "",
        temperament: [],
        image: "",
      });
    }
  }

  function validate(input) {
    const numValidate = /^[0-9]+$/;
    const urlValidate = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i;
    let errors = {};
    if (!input.name) {
      errors.name = "Don't forget the name! ^^'";
    } else if (
      numValidate.test(input.min_height) === false ||
      !input.min_height
    ) {
      errors.min_height =
        "There is no minimum height or it is not a valid format! (Only numbers)";
    } else if (
      numValidate.test(input.max_height) === false ||
      !input.max_height
    ) {
      errors.max_height =
        "There is no maximum height or it is not a valid format! (Only numbers)";
    } else if (
      !input.min_weight ||
      numValidate.test(input.min_weight) === false
    ) {
      errors.min_weight =
        "There is no minimum weight or it is not a valid format! (Only numbers)";
    } else if (
      !input.max_weight ||
      numValidate.test(input.max_weight) === false
    ) {
      errors.max_weight =
        "There is no maximum weight or it is not a valid format! (Only numbers)";
    } else if (!input.lifespan || numValidate.test(input.lifespan) === false) {
      errors.lifespan =
        "Uhm ... missing a lifespan or it is not a valid format! (Numbers only)";
    } else if (!input.image || urlValidate.test(input.image) === false) {
      errors.image =
        "An image will make it easier to identify your dog, add one valid address :D";
    } else if (!input.temperament) {
      errors.temperament = "Choose at least one temperament for your dog :D";
    }

    return errors;
  }

  function handleDelete(e, t) {
    e.preventDefault();
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== t),
    });
  }

  return (
    <div className={styles.container}>
      <Link to="/home">
        <button className={styles.btn}>Back to Home</button>
      </Link>
      <h1> Here you can create a new breed entry!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className={styles.lbl}>Name </label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
            className={styles.inpt}
          />
          {errors.name && (
            <p>
              {" "}
              <br />
              {errors.name} <br />
            </p>
          )}
        </div>

        <div>
          <label className={styles.lbl}>Minimum Height (cm.) </label>
          <input
            type="text"
            name="min_height"
            value={input.min_height}
            onChange={(e) => handleChange(e)}
            className={styles.inpt}
          />
          {errors.min_height && (
            <p>
              <br />
              {errors.min_height} <br />
            </p>
          )}
        </div>

        <div>
          <label className={styles.lbl}>Maximum Height (cm.) </label>
          <input
            type="text"
            name="max_height"
            value={input.max_height}
            onChange={(e) => handleChange(e)}
            className={styles.inpt}
          />
        </div>
        {errors.max_height && (
          <p>
            {" "}
            <br />
            {errors.max_height} <br />
          </p>
        )}

        <div>
          <label className={styles.lbl}>Minimum Weight (kg.) </label>
          <input
            type="text"
            name="min_weight"
            value={input.min_weight}
            onChange={(e) => handleChange(e)}
            className={styles.inpt}
          />
        </div>
        {errors.min_weight && (
          <p>
            {" "}
            <br />
            {errors.min_weight} <br />
          </p>
        )}

        <div>
          <label className={styles.lbl}>Maximum Height (kg.) </label>
          <input
            type="text"
            name="max_weight"
            value={input.max_weight}
            onChange={(e) => handleChange(e)}
            className={styles.inpt}
          />
          {errors.max_weight && (
            <p>
              {" "}
              <br />
              {errors.max_weight} <br />
            </p>
          )}
        </div>

        <div>
          <label className={styles.lbl}>Lifespan (years) </label>
          <input
            type="text"
            name="lifespan"
            value={input.lifespan}
            onChange={(e) => handleChange(e)}
            className={styles.inpt}
          />
          {errors.lifespan && (
            <p>
              {" "}
              <br />
              {errors.lifespan} <br />
            </p>
          )}
        </div>

        <div>
          <label className={styles.lbl}>Temperaments </label>
          <select onChange={(e) => handleSelect(e)} className={styles.inpt}>
            <option value="" disabled>
              Choose one or more...
            </option>
            {temps.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
          {errors.temperament && (
            <p>
              {" "}
              <br />
              {errors.temperament} <br />
            </p>
          )}
          <br />
          {input.temperament.map((t) => (
            <div className={styles.temps}>
              <span key={temps.id}>{t}</span>{" "}
              <button
                onClick={(e) => handleDelete(e, t)}
                className={styles.cls}
              >
                x
              </button>
            </div>
          ))}
        </div>

        <div>
          <label className={styles.lbl}>Image </label>
          <input
            type="text"
            name="image"
            value={input.image}
            onChange={(e) => handleChange(e)}
            className={styles.inpt}
          />
          {errors.image && (
            <p>
              {" "}
              <br />
              {errors.image} <br />
            </p>
          )}
        </div>

        <div>
          <button type="submit" className={styles.btn}>
            Add breed!
          </button>
        </div>
      </form>
    </div>
  );
}
