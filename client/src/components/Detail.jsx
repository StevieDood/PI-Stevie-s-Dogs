import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../store/actions/index.js";
import watchingDog from "../assets/homedog.png";
import sideDog from "../assets/detaildog.png";
import styles from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const dogDetail = useSelector((state) => state.detail);
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div className={styles.container}>
      <Link to="/home">
        <button className={styles.btn}> Back to Home </button>
      </Link>
      {dogDetail[0] ? (
        <div>
          <img
            src={dogDetail[0].image}
            alt="broken"
            className={styles.detailPic}
          />
          <h1>
            {" "}
            Hey there :D! <br /> My breed is {dogDetail[0].name}
          </h1>
          <h3>
            {" "}
            My temperaments are{" "}
            {Array.isArray(dogDetail[0].temperament)
              ? dogDetail[0].temperament.join(", ")
              : dogDetail[0].temperament}
            .
          </h3>
          <h3>
            {" "}
            My minimum height is {dogDetail[0].min_height} cms, and maximum{" "}
            {dogDetail[0].max_height} cms.
          </h3>
          <h3>
            {" "}
            My minimum weight is {dogDetail[0].min_weight} kgs, and maximum{" "}
            {dogDetail[0].max_weight} kgs.
          </h3>
          <h3>
            {" "}
            Lastly, my average lifespan is {dogDetail[0].lifespan} years.
          </h3>
        </div>
      ) : (
        <p> ...Oops! There's a missing dog !</p>
      )}

      <img src={watchingDog} alt="" className={styles.bottomDog} />
      <img src={sideDog} alt="" className={styles.sideDog} />
    </div>
  );
}
