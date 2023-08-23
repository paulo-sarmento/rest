import classes from "./CartItemsList.module.css";
import CartItem from "./CartItem";
import Container from "../../Components/Layout/Container/Container";
import Button from "../../Components/UI/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { selectAllItems, selectTotalPrice } from "./cartSlice";
import { cartSliceActions, useOrderMutation } from "./cartSlice";
import { formatPrice } from "../../utils/formatUtils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CartItemsList = () => {
  const navigate = useNavigate();
  const items = useSelector(selectAllItems);

  const cartTotalPrice = useSelector(selectTotalPrice);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [fetchOrder, result] = useOrderMutation();

  const dispatch = useDispatch();

  const cartItemRemoveHandler = (id) => {
    dispatch(cartSliceActions.removeItem(id));
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartSliceActions.addItem(item));
  };

  const canSave = Boolean(items?.length) && !result.isLoading;

  const onClickBuyHandler = async () => {
    if (!user) {
      return navigate("/login", { state: { from: "cart" } });
    }

    const order = { id: user.id, totalPrice: cartTotalPrice };

    try {
      const orderQueryResponse = await fetchOrder({ order, items }).unwrap();

      toast.success(orderQueryResponse, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

      dispatch(cartSliceActions.resetCart());
    } catch (error) {
      console.log(error);
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
        <h1 className={classes.title}>CARRINHO</h1>
      </section>
      <main className={classes.main}>
        <Container className={classes.container}>
          <ul className={classes.list}>{cartItems}</ul>
          <div>
            <span className={classes.total}>Total:</span>
            <span className={classes.price}>{formatPrice(cartTotalPrice)}</span>
          </div>
          <Button
            className={classes["btn-comprar"]}
            onClick={onClickBuyHandler}
            disabled={!canSave}
          >
            finalizar compra
          </Button>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="colored"
          />
        </Container>
      </main>
    </>
  );
};

export default CartItemsList;
