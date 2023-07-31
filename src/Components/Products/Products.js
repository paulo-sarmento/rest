import classes from "./Products.module.css";
import Card from "../UI/Card/Card";
import Container from "../Layout/Container/Container";

const Products = ({ productsList }) => {
  const items = productsList.map((item) => {
    return (
      <Card
        key={item.id}
        id={item.id}
        img={item.img}
        name={item.name}
        price={item.price}
      />
    );
  });

  return (
    <section>
      <Container>
        <ul className={classes.list}>{items}</ul>
      </Container>
    </section>
  );
};

export default Products;
