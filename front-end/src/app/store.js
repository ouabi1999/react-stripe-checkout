import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/shopping_cart/cartSlice";

export const store = configureStore({
    reducer:{
        cart: cartReducer,
       

    }
})