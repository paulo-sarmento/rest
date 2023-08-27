import classes from "./Products.module.css";
import Card from "./UI/Card";
import Container from "../Layout/Container/Container";

const Products = ({ productsList }) => {
  const items = productsList.map((item) => {
    return (
      <Card
        key={item.id}
        id={item.id}
        img={item.imgSrc}
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
      <div className={classes.test}></div>
    </section>
  );
};

export default Products;
