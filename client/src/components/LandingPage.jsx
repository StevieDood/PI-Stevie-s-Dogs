import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import LPBG from "../assets/LPBG.mp4";

export default function LandingPage() {
  return (
    <div>
      <video autoPlay loop muted className={styles.video}>
        <source src={LPBG} type="video/mp4" />
      </video>
      <h1 className={styles.title}>
        Welcome to <br /> Stevie's Dogs!
      </h1>
      <Link to="/home">
        <button className={styles.btn}>Enter</button>
      </Link>
    </div>
  );
}
