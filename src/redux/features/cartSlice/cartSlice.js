import { createSlice } from "@reduxjs/toolkit";

//  Cart Slice - Basic structure for future implementation
// This is a placeholder for cart functionality that will be implemented later
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [], // Array of cart items
    
  },
  reducers: {
    //  Placeholder reducers - implement these when needed
    addItemToCart: (state, action) => {
      const productsData = action.payload;
      const existingItem = state.cart.find(
        (item) => item._id === productsData._id
      );
      if (existingItem) {
        // If item exists, update quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add to cart
        state.cart.push({ ...productsData, quantity: 1 });
      }
    },
    removeItemFromCart: (state, action) => {},
    quantityIncrement: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find((item) => item._id === itemId);
      if (item && item.quantity) {
        item.quantity += 1;
      }
    },
    quantityDecrement: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find((item) => item._id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

//   Export actions when implemented
export const {
  addItemToCart,
  removeItemFromCart,
  quantityIncrement,
  quantityDecrement,
} = cartSlice.actions;

export default cartSlice.reducer;
