import React, { useState, useEffect } from "react";
import "./PlaceOrder.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { getCartTotal, getCartItems } from "../../reducer";
import orderService from "../../services/orderService";
import {
  AiFillPlusCircle as Plus,
  AiFillMinusCircle as Minus,
} from "react-icons/ai";

function PlaceOrder() {
  let history = useHistory();
  const [{ cart }, dispatch] = useStateValue();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [menu, setMenu] = useState([]);
  const [tableNo, setTableNo] = useState(0);

  useEffect(() => {
    orderService.getMenu().then((res) => setMenu(res.data));
  }, []);

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

    const subtotal = getCartTotal(cart);

    const orderItems = cart.map((cartItem, index) => {
      const { id, count } = cartItem;
      return {
        item_id: id,
        count: count,
      };
    });

    console.log(tableNo, orderItems);
    orderService.addorder({
      id: tableNo,
      orderItems: orderItems,
    });
  }

  function getCartIndex(id) {
    let index = cart.findIndex((cartItem) => cartItem.id === id);
    return index;
  }

  function showMenu() {
    return menu.map((menuItem, index) => {
      let { id, item, price } = menuItem;

      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{item}</td>
          <td>${price}</td>
          <td className="menu__item">
            <Plus
              className="menu__options"
              onClick={() => {
                addToCart(menuItem);
              }}
            ></Plus>
            <input
              type="text"
              className="menu__count"
              disabled={true}
              value={cart[getCartIndex(id)] ? cart[getCartIndex(id)].count : 0}
            />
            <Minus
              className="menu__options"
              onClick={() => removeFromCart(id)}
            ></Minus>
          </td>
        </tr>
      );
    });
  }

  function addToCart(menuItem) {
    let index = getCartIndex(menuItem.id);
    let c = cart[index]?.count ? cart[index].count + 1 - 1 : 0;
    if (index < 0) {
      dispatch({
        type: "ADD_TO_CART",
        item: {
          id: menuItem.id,
          item: menuItem.item,
          price: menuItem.price,
          count: 1,
        },
      });
    } else {
      dispatch({
        type: "UPDATE_CART",
        item: {
          index: index,
          count: c + 1,
        },
      });
    }
  }

  function removeFromCart(id) {
    let index = getCartIndex(id);
    let c = cart[index]?.count ? cart[index].count + 1 - 1 : 0;

    if (index >= 0) {
      if (cart[index]?.count === 1) {
        dispatch({
          type: "REMOVE_FROM_CART",
          index: index,
        });
      } else {
        dispatch({
          type: "UPDATE_CART",
          item: {
            index: index,
            count: c - 1,
          },
        });
      }
    } else {
      console.warn("Can't delete item with id: ", { id });
    }
  }

  function checkout() {
    dispatch({
      type: "DECREASE_TABLES",
    });
    history.push("/");
  }

  return (
    <div className="placeorder__container">
      <h1 className="heading">
        Please select desired items from the below menu
      </h1>
      {menu?.length > 0 && (
        <>
          <table className="menu">
            <thead>
              <tr>
                <td colSpan="4" className="table__details">
                  Table No ▶{" "}
                  <input
                    type="text"
                    className="table__number"
                    placeholder={0}
                    onChange={(e) => setTableNo(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Number</th>
                <th>Item</th>
                <th>Price</th>
                <th>Add to Order</th>
              </tr>
            </thead>
            <tbody>
              {showMenu()}
              <tr className="expanded__row">
                <td colSpan="4">Items: {getCartItems(cart)}</td>
              </tr>
              <tr className="expanded__row">
                <td colSpan="4">Subtotal: ${getCartTotal(cart)}</td>
              </tr>
            </tbody>
          </table>

          <button
            className="placeorder__button"
            onClick={showOrderPopup}
            disabled={cart.length > 0 && tableNo > 0 ? false : true}
          >
            Order Now
          </button>
        </>
      )}

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
