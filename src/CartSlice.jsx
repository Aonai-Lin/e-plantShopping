import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {

    // payload为item
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item)=>item.name===name); 
      if(existingItem){
        existingItem.quantity++;
      }else{
        state.items.push({name, image, cost, quantity:1});
      }
    },

    // payload为name,写state.items = state.items.filter((item) => {item.name!==action.payload});的话会把所有item都删掉，因为使用了大括号需要显式return，所以没写return返回空
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name!==action.payload);
    },

    // payload为item
    updateQuantity: (state, action) => {
      const {name, quantity} = action.payload;
      const targetItem = state.items.find((item)=>item.name===name);
      if(targetItem){
        targetItem.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
