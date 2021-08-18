import React from "react";
import "./Home.css";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";

function Home() {
  const [{ cart, tables }] = useStateValue();

  let history = useHistory();

  function placeOrder() {
    history.push("/orders/new");
  }

  function checkout() {
    history.push("/orders/checkout");
  }

  return (
    <div className="home__container">
      <h1>Welcome to GoodFood</h1>

      <div className="home__menu">
        <button
          className="menu__button"
          onClick={placeOrder}
          disabled={cart.length > 0 || tables === 0 ? true : false}
        >
          Place Order
        </button>
        <button
          className="menu__button"
          disabled={cart.length > 0 ? false : true}
          onClick={checkout}
        >
          Checkout
        </button>
      </div>

      <div className="vacancy">
        <h3 className="message" hidden={tables === 0 ? true : false}>
          Tables available: {tables}
        </h3>
      </div>

      {tables === 0 && (
        <h3>No tables available! Please join the waiting list!</h3>
      )}
    </div>
  );
}

export default Home;
