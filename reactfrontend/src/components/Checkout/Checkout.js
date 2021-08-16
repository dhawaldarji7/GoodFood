import React, { useState } from "react";
import "./Checkout.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { getCartTotal } from "../../reducer";
import orderService from "../../services/orderService";

function Checkout() {
  let [{ cart }, dispatch] = useStateValue();
  const [paymentDone, setPaymentDone] = useState(false);
  let history = useHistory();

  function showCart() {
    return cart.map((cartItem, index) => {
      const { id, item, price } = cartItem;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{item}</td>
          <td>${price}</td>
        </tr>
      );
    });
  }

  const OrderPopup = (props) => {
    return (
      <div className="order__container">
        <div className="order__popup">
          <h3>Thank you! Visit Again!</h3>
          {props.content}
          <button className="placeorder__button" onClick={goHome}>
            Proceed
          </button>
        </div>
      </div>
    );
  };

  function showOrderPopup() {
    setPaymentDone(!paymentDone);
  }

  function goHome() {
    const subtotal = getCartTotal(cart);
    console.log(subtotal);
    orderService.addorder({
      cust_name: "John",
      subtotal: subtotal,
    });

    dispatch({
      type: "EMPTY_CART",
    });

    dispatch({
      type: "DECREASE_TABLES",
    });
    history.push("/");
  }

  return (
    <div className="checkout__container">
      <h1 className="heading">Please review the order and make payment!</h1>
      <table className="order__review">
        <thead>
          <tr>
            <th>Number</th>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {showCart()}
          <tr className="subtotal__row">
            <td colSpan="4">Items: {cart.length}</td>
          </tr>
          <tr className="subtotal__row">
            <td colSpan="4">Subtotal: ${getCartTotal(cart)}</td>
          </tr>
        </tbody>
      </table>

      <button className="paynow__button" onClick={showOrderPopup}>
        Pay Now
      </button>

      {paymentDone && (
        <OrderPopup
          content={
            <>
              <h4 style={{ fontWeight: "200" }}>
                Please click on 'Proceed' to continue
              </h4>
            </>
          }
          handleClose={showOrderPopup}
        ></OrderPopup>
      )}
    </div>
  );
}

export default Checkout;
