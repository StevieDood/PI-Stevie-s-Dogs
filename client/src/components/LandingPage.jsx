import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <div className={styles.video}>
        <iframe
          title="landingvideo"
          height="100%"
          width="100%"
          position="absolute"
          frameBorder="0"
          src={
            "https://www.youtube.com/embed/jP2ZQHrYRME?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&autohide=1&modestbranding=1"
          }
          pointerEvents="none"
        ></iframe>
      </div>
      <h1 className={styles.title}>
        Welcome to <br /> Stevie's Dogs!
      </h1>
      <Link to="/home">
        <button className={styles.btn}>Enter</button>
      </Link>
    </div>
  );
}
