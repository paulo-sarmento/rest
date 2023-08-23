import { useNavigate } from "react-router-dom";

import classes from "./Logo.module.css";

const Logo = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/");
  };

  return (
    <div className={classes.logo} onClick={onClickHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="53"
        viewBox="0 0 80 53"
      >
        <g id="Logo" transform="translate(-35 -51)">
          <text
            id="Grub"
            transform="translate(35 72)"
            fill="#707070"
            fontSize="22"
            fontFamily="Montserrat-Light, Montserrat"
            fontWeight="300"
          >
            <tspan x="0" y="0">
              Grub
            </tspan>
          </text>
          <text
            id="Grab"
            transform="translate(37 96)"
            fill="#ff2415"
            fontSize="32"
            fontFamily="Montserrat-Regular, Montserrat"
          >
            <tspan x="0" y="0">
              Grab
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
