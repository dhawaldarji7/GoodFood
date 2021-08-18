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
    return axios.get(BASE_URL + "/orders/" + orderId);
  }

  // delete a order record
  deleteorder(orderId) {
    return axios.delete(BASE_URL + "/orders/" + orderId);
  }

  // delete all order records
  deleteallorders() {
    return axios.delete(BASE_URL + "/orders/all");
  }

  getMenu() {
    return axios.get(BASE_URL + "/menu");
  }
}
export default new orderService();
