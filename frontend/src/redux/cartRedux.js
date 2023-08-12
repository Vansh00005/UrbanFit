import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      // Find the index of the product to remove
      const index = state.products.findIndex(product => product._id === action.payload);

      // If the product is found, update the state accordingly
      if (index !== -1) {
        const removedProduct = state.products[index];
        state.quantity -= removedProduct.quantity;
        state.total -= removedProduct.price * removedProduct.quantity;
        state.products.splice(index, 1);
      }
    },
  },
});

export const { addProduct, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
