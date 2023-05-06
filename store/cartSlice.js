import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    total: 0,
    cartShown: false,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
           
            const existingItemIndex = state.items.findIndex((i) => i.id === action.payload.id);

            if (existingItemIndex !== -1) {

                // If the item already exists in the cart, update the quantity
                state.items[existingItemIndex].quantity += action.payload.quantity;
            } else {
                // Otherwise, add the new item to the cart
                state.items.push(action.payload);
            }

            state.total += action.payload.quantity * action.payload.price;
        },
        removeItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
            state.items.splice(itemIndex, 1);
            state.total -= action.payload.price;
        },
        decreaseQty: (state, action) => {
            console.log("dsda" ,  state)
            const existingItemIndex = state.items.findIndex((i) => i.id === action.payload.id);

            if (existingItemIndex !== -1) {
                const itemPrice = state.items[existingItemIndex].price;

                if (state.items[existingItemIndex].quantity > 1) {

                    // If the quantity is greater than 1, decrease it by 1
                    state.items[existingItemIndex].quantity -= 1;
                    state.total -= itemPrice;
                } else {
                    state.items.splice(existingItemIndex, 1);
                    state.total -= itemPrice;
                }
            }
        },
        increaseQty: (state, action) => {
            console.log("dsda" ,  state)
            const existingItemIndex = state.items.findIndex((i) => i.id === action.payload.id);
            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].quantity += 1;

                state.total += state.items[existingItemIndex].price;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            state.cartShown = false;
        },
        toggleCartVisiblity: (state) => {
            state.cartShown = !state.cartShown;
        },
        



    },
});

export const { addItem, removeItem, decreaseQty, increaseQty, clearCart, toggleCartVisiblity } = cartSlice.actions;

export default cartSlice.reducer;
