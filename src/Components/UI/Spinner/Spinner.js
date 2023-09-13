import classes from "./Spinner.module.css";

const Spinner = ({ className }) => {
  return (
    <div className={classes.wrapper}>
      <div className={`${classes.loader} ${className}`}></div>
    </div>
  );
};

export default Spinner;
