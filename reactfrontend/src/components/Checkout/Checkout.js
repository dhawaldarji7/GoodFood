import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import orderService from "../../services/orderService";

function Checkout() {
  let [, dispatch] = useStateValue();
  const [paymentDone, setPaymentDone] = useState(false);
  const [tableNo, setTableNo] = useState(0);
  const [order, setOrder] = useState({});
  const [orderFetched, setOrderFetched] = useState(false);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    orderService.getMenu().then((res) => setMenu(res.data));
  }, []);

  let history = useHistory();

  function showCart() {
    return order.od?.orderItems.map((cartItem, index) => {
      const { item_id, count } = cartItem;
      const menuItem = menu[item_id - 1];
      return (
        <tr key={item_id}>
          <td>{menuItem.item}</td>
          <td>{count}</td>
          <td>{menuItem.price}</td>
        </tr>
      );
    });
    console.log(order.od?.orderItems);
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
    dispatch({
      type: "EMPTY_CART",
    });

    dispatch({
      type: "INCREASE_TABLES",
    });
    history.push("/");
  }

  function fetchOrder(tableNo) {
    orderService.getorderById(tableNo).then((res) => setOrder(res.data));
    setOrderFetched(!orderFetched);
  }

  return (
    <div className="checkout__container">
      <h1 className="heading">Please review the order and make payment!</h1>
      <div className="fetch__order">
        <h3 className="subheading">
          Enter table no:
          <input
            type="text"
            className="table__number"
            placeholder={0}
            onClick={() => {
              setTableNo(0);
              setOrderFetched(false);
              setOrder({});
            }}
            onChange={(e) => {
              setTableNo(e.target.value);
            }}
          />
          <button
            className="fetch__button"
            disabled={tableNo > 0 ? false : true}
            onClick={() => {
              fetchOrder(tableNo);
            }}
          >
            Fetch Order
          </button>
        </h3>
      </div>

      {orderFetched && tableNo > 0 && order?.od !== undefined && (
        <>
          <table className="order__review">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {showCart()}

              <tr className="subtotal__row">
                <td colSpan="4">Items: {order.count}</td>
              </tr>
              <tr className="subtotal__row">
                <td colSpan="4">Subtotal: ${order.subtotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <button className="paynow__button" onClick={showOrderPopup}>
            Pay Now
          </button>
        </>
      )}

      {orderFetched && tableNo > 0 && order?.od === undefined && (
        <h3 className="warn">No order found for given table!</h3>
      )}

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
