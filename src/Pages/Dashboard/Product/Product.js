import classes from "./Product.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { formatPrice } from "../../../utils/formatUtils";

import { useInactivateProductMutation } from "../../../features/products/productsSlice";

const Product = ({ id, img, name, price, inactive }) => {
  const [showInactiveModal, setShowInactiveModal] = useState(false);

  const [inactivateProduct] = useInactivateProductMutation();

  const onInactiveProductHandler = (e) => {
    setShowInactiveModal(!showInactiveModal);
  };

  const onConfirmInactiveProductHandler = async () => {
    try {
      await inactivateProduct({
        id,
      }).unwrap();
    } catch (err) {
      console.error("Failed to save the post", err);
    }

    setShowInactiveModal(!showInactiveModal);
  };

  return (
    <>
      <li key={id} className={classes["list-item"]}>
        <div className={classes["wrapper-btn"]}>
          <button className={`${classes.btn} ${classes["btn-edit"]}`}>
            <Link to={`edit/${id}`} className={classes.link}>
              <FontAwesomeIcon icon={solid("file-pen")} />
            </Link>
          </button>
          <button
            className={`${classes.btn} ${classes["btn-inactive"]}`}
            onClick={onInactiveProductHandler}
          >
            <FontAwesomeIcon icon={solid("x")} />
          </button>
        </div>
        <div className={classes["wrapper-item"]}>
          <div className={classes["wrapper-img"]}>
            <span className={classes.span}>img</span>
            <img src={img} alt="" className={classes.img} />
          </div>
          <div className={classes["wrapper-id"]}>
            <span className={classes.span}>id</span>
            <h2>{id}</h2>
          </div>
          <div className={classes["wrapper-name"]}>
            <span className={classes.span}>Nome</span>
            <h2>{name}</h2>
          </div>
          <div className={classes["wrapper-price"]}>
            <span className={classes.span}>Preço</span>
            <h2>{formatPrice(price)}</h2>
          </div>
        </div>
      </li>
      {showInactiveModal && (
        <div className={classes.modal}>
          <div className={classes["modal-content"]}>
            {inactive ? <p>Ativar produto?</p> : <p>Inativar produto?</p>}
            <button
              className={`${classes.btn} ${classes["btn-confirm"]}`}
              onClick={onConfirmInactiveProductHandler}
            >
              <FontAwesomeIcon icon={solid("check")} />
            </button>
            <button
              className={`${classes.btn} ${classes["btn-reject"]}`}
              onClick={onInactiveProductHandler}
            >
              <FontAwesomeIcon icon={solid("xmark")} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
