import { createSlice } from "@reduxjs/toolkit";

//  Cart Slice - Basic structure for future implementation
// This is a placeholder for cart functionality that will be implemented later
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array of cart items
    totalQuantity: 0, // Total number of items in cart
    totalAmount: 0, // Total price of all items
  },
  reducers: {
    //  Placeholder reducers - implement these when needed
    addItemToCart: (state, action) => {},
    removeItemFromCart: (state, action) => {},

    updateItemQuantity: (state, action) => {},
  },
});

//   Export actions when implemented
export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  updateItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
