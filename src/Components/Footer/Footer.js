import classes from "./Footer.module.css";

import Container from "../Layout/Container/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const Footer = () => {
  return (
    <>
      <footer className={classes.footer}>
        <Container className={classes["footer-wrapper"]}>
          <div>
            <h3 className={classes.title}>Encontre nosso restaurante</h3>
            <p className={classes.info}>
              Av. Sanim Play, 4546 - Centro. Rolim de Moura 76940000
            </p>
          </div>
          <div>
            <h3 className={classes.title}>Horários de funcionamento</h3>
            <p className={classes.info}>SEGUNDA A SEXTA 08:00 - 18:00</p>
            <p className={classes.info}>SÁBADO 12:00 - 18:00</p>
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
        </Container>
      </footer>
    </>
  );
};

export default Footer;
