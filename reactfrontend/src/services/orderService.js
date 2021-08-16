import axios from "axios";

const BASE_URL = "http://localhost:8080/restapi";

class orderService {
  // Get all orders
  getAllOrders() {
    return axios.get(BASE_URL + "/orders");
  }

  // Adding a new order
  addorder(order) {
    return axios.post(BASE_URL + "/orders", order);
  }

  // Find a order using orderId
  getorderById(orderId) {
    return axios.get(BASE_URL + "/ordrers/" + orderId);
  }

  // Update a order record
  updateorder(order, orderId) {
    return axios.get(BASE_URL + "/" + orderId, order);
  }

  // delete a order record
  deleteorder(orderId) {
    return axios.delete(BASE_URL + "/" + orderId);
  }
}
export default new orderService();
