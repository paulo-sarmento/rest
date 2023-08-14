import classes from "./CartItemsList.module.css";
import CartItem from "./CartItem";
import Container from "../../Components/Layout/Container/Container";
import Button from "../../Components/UI/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { selectAllItems, selectTotalPrice } from "./cartSlice";
import { cartSliceActions, useOrderMutation } from "./cartSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CartItemsList = () => {
  const items = useSelector(selectAllItems);

  const cartTotalPrice = useSelector(selectTotalPrice);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [fetchOrder, result] = useOrderMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const cartItemRemoveHandler = (id) => {
    dispatch(cartSliceActions.removeItem(id));
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartSliceActions.addItem(item));
  };

  const canSave =
    Boolean(user?.id) && Boolean(items?.length) && !result.isLoading;

  const onClickBuyHandler = async () => {
    const order = { id: user.id, totalPrice: cartTotalPrice };

    try {
      const orderQueryResponse = await fetchOrder({ order, items }).unwrap();

      setMessage(orderQueryResponse);
      setShowMessage(true);

      dispatch(cartSliceActions.onOrder());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timeout = setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [showMessage]);

  const cartItems = items.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      img={item.img}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onRemove={cartItemRemoveHandler}
      onAdd={cartItemAddHandler}
    />
  ));

  return (
    <>
      <section>
        <h1 className={classes.title}>CARRINHO</h1>
      </section>
      <main className={classes.main}>
        <Container className={classes.container}>
          <ul className={classes.list}>{cartItems}</ul>
          <div>
            <span className={classes.total}>Total:</span>
            <span className={classes.price}>
              {cartTotalPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <Button
            className={classes["btn-comprar"]}
            onClick={onClickBuyHandler}
            disabled={!canSave}
          >
            finalizar compra
          </Button>
          {showMessage && <p className={classes.message}>{message}</p>}
        </Container>
      </main>
    </>
  );
};

export default CartItemsList;
