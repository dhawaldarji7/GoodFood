import "./App.css";
import Home from "./components/Home/Home";
import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import Checkout from "./components/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/orders/new" component={PlaceOrder}></Route>
          <Route exact path="/orders/checkout" component={Checkout}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
