export const initialState = {
  cart: [],
  tables: 10,
};

export const getCartTotal = (cart) => {
  const total = cart?.reduce(
    (amount, item) => item.price * item.count + amount,
    0
  );
  return total.toFixed(2);
};

export const getCartItems = (cart) => {
  const totalItems = cart?.reduce((numItems, item) => item.count + numItems, 0);
  return totalItems;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case "REMOVE_FROM_CART":
      let newCart = [...state.cart];

      newCart.splice(action.index, 1);

      return {
        ...state,
        cart: newCart,
      };

    case "UPDATE_CART":
      let updatedCart = [...state.cart];
      let ix = action.item.index;
      let updatedItem = updatedCart[ix];
      updatedItem.count = action.item.count;

      return {
        ...state,
        cart: updatedCart,
      };

    case "EMPTY_CART":
      let emptyCart = [];

      // state.menu.forEach((menuItem) => {
      //   menuItem.isSelected = false;
      // });
      return {
        ...state,
        cart: emptyCart,
      };

    case "DECREASE_TABLES":
      let decTables = state.tables;
      decTables -= 1;
      return {
        ...state,
        tables: decTables,
      };

    case "INCREASE_TABLES":
      let incTables = state.tables;
      incTables += 1;
      return {
        ...state,
        tables: incTables,
      };

    case "GET_MENU":
      return {
        ...state,
        menu: action.item,
      };

    default:
      return state;
  }
};

export default reducer;
