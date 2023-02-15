import React from "react";
import classes from "./Footer.module.css";
import Container from "../Layout/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Footer = () => {
  return (
    <>
      <Container>
        <div className={classes["footer-wrapper"]}>
          <div>
            <h3 className={classes.title}>Encontre nosso restaurante</h3>
            <p>Av. Sanim Play, 4546 - Centro. Rolim de Moura 76940000</p>
          </div>
          <div>
            <h3 className={classes.title}>Horários de funcionamento</h3>
            <p>SEGUNDA A SEXTA 08:00 - 18:00</p>
            <p>SÁBADO 12:00 - 18:00</p>
          </div>
          <div>
            <h3 className={classes.title}>Nossas redes sociais</h3>
            <div className={classes["social-media-container"]}>
              <div className={classes["social-icon"]}>
                <FontAwesomeIcon icon={brands("facebook")} />
              </div>
              <div className={classes["social-icon"]}>
                <FontAwesomeIcon icon={brands("instagram")} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Footer;
