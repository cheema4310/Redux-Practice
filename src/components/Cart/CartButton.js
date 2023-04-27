import classes from "./CartButton.module.css";
import { toggle } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
  const distpatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const toggleHandler = () => {
    distpatch(toggle());
  };

  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
