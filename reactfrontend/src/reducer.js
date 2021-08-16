export const initialState = {
  cart: [],
  tables: 10,

  menu: [
    {
      id: 1,
      item: "Paneer Tikka Masala",
      price: 13.99,
      isSelected: false,
    },
    {
      id: 2,
      item: "Chicken Tikka Masala",
      price: 17.99,
      isSelected: false,
    },
    { id: 3, item: "Jeera Rice", price: 9.99, isSelected: false },
    { id: 4, item: "Naan", price: 3.99, isSelected: false },
    { id: 5, item: "Garlic Naan", price: 4.99, isSelected: false },
    { id: 6, item: "Gulab Jamun", price: 5.99, isSelected: false },
    { id: 7, item: "Lassi", price: 2.99, isSelected: false },
  ],
};

export const getCartTotal = (cart) => {
  const total = cart?.reduce((amount, item) => item.price + amount, 0);
  return total.toFixed(2);
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case "REMOVE_FROM_CART":
      let newCart = [...state.cart];

      const i = state.cart.findIndex((cartItem) => cartItem.id === action.id);

      if (i >= 0) {
        //remove
        newCart.splice(i, 1);
      } else {
        console.warn(`Cant remove product (id: ${action.id}).`);
      }

      return {
        ...state,
        cart: newCart,
      };

    case "EMPTY_CART":
      let emptyCart = [];

      state.menu.forEach((menuItem) => {
        menuItem.isSelected = false;
      });
      return {
        ...state,
        cart: emptyCart,
      };

    case "DECREASE_TABLES":
      let newTables = state.tables;
      newTables -= 1;
      return {
        ...state,
        tables: newTables,
      };

    default:
      return state;
  }
};

export default reducer;
