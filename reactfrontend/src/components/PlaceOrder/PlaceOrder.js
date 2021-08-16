import React, { useState } from "react";
import "./PlaceOrder.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { getCartTotal } from "../../reducer";

function PlaceOrder() {
  let history = useHistory();
  const [{ cart, menu }, dispatch] = useStateValue();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const OrderPopup = (props) => {
    return (
      <div className="order__container">
        <div className="order__popup">
          <h3>Order placed successfully!</h3>
          {props.content}
          <button className="placeorder__button" onClick={checkout}>
            Proceed
          </button>
        </div>
      </div>
    );
  };

  function showOrderPopup() {
    setOrderPlaced(!orderPlaced);
  }

  function showMenu() {
    return menu.map((menuItem, index) => {
      const { id, item, price } = menuItem;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{item}</td>
          <td>${price}</td>
          <td>
            <input
              type="checkbox"
              className="menu__addItem"
              onClick={() => handleClick(index)}
            />
          </td>
        </tr>
      );
    });
  }

  function handleClick(id) {
    menu[id].isSelected = !menu[id].isSelected;

    menu[id].isSelected === true
      ? addToCart(menu[id].id)
      : removeFromCart(menu[id].id);
  }

  function addToCart(id) {
    const menuItem = menu[id - 1];

    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: menuItem.id,
        item: menuItem.item,
        price: menuItem.price,
      },
    });
  }

  function removeFromCart(id) {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  }

  function checkout() {
    history.push("/");
  }

  return (
    <div className="placeorder__container">
      <h1 className="heading">
        Please select desired items from the below menu
      </h1>

      <table className="menu">
        <thead>
          <tr>
            <th>Number</th>
            <th>Item</th>
            <th>Price</th>
            <th>Add to Order</th>
          </tr>
        </thead>
        <tbody>
          {showMenu()}
          <tr className="subtotal__row">
            <td colSpan="4">Items: {cart.length}</td>
          </tr>
          <tr className="subtotal__row">
            <td colSpan="4">Subtotal: ${getCartTotal(cart)}</td>
          </tr>
        </tbody>
      </table>

      <button
        className="placeorder__button"
        onClick={showOrderPopup}
        disabled={cart.length > 0 ? false : true}
      >
        Order Now
      </button>

      {orderPlaced && (
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

export default PlaceOrder;
