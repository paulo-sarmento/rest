import classes from "./Modal.module.css";

import Container from "../../../Components/Layout/Container/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Modal = ({ children, setShowModal }) => {
  <Container className={classes.bg}>
    <div className={classes.modal}>
      <span
        onClick={() => setShowModal(false)}
        className={classes["close-btn"]}
      >
        <FontAwesomeIcon icon={solid("x")} />
      </span>
      {children}
    </div>
  </Container>;
};
export default Modal;
