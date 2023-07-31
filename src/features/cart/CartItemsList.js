import classes from "./CartItemsList.module.css";
import CartItem from "./CartItem";
import Logo from "../../Components/UI/Logo/Logo";
import Container from "../../Components/Layout/Container/Container";
import Button from "../../Components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions } from "./cartSlice";
import { selectAllItems, selectTotalPrice } from "./cartSlice";
import { getUser } from "../auth/authSlice";

const CartItemsList = () => {
  const items = useSelector(selectAllItems);
  const cartTotalPrice = useSelector(selectTotalPrice);
  const user = useSelector(getUser);

  console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItemRemoveHandler = (id) => {
    dispatch(cartSliceActions.removeItem(id));
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartSliceActions.addItem(item));
  };

  const onClickBuyHandler = () => {
    if (user?.id) {
      console.log("hi usuário logado");
    } else {
      console.log("usuário deslogado");
    }
  };

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
        <Logo />
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
          >
            finalizar compra
          </Button>
        </Container>
      </main>
    </>
  );
};

export default CartItemsList;
