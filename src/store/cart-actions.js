import { showNotification } from "./ui-slice";
import { replaceCart } from "./cart-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      showNotification({
        status: "pending",
        title: "Sending..",
        message: "Sending Cart Data..",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(process.env.REACT_APP_FIREBASE_URL, {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });

      if (!res.ok) {
        throw new Error("Data sending Failed..");
      }
    };

    try {
      await sendRequest();

      dispatch(
        showNotification({
          status: "success",
          title: "Sent",
          message: "Task Completed..",
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(process.env.REACT_APP_FIREBASE_URL);

      if (!res.ok) {
        throw new Error("Data Fetching Failed..");
      }

      const data = res.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        })
      );
    }
  };
};
