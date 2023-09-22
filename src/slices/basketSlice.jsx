import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    basket:[],
    amount:0,
    totalAmount:0,
    totalPrice:0,
    filteredBasket:[]
}

export const basketSlice = createSlice({
    name: "Basket",
    initialState,
    reducers: {
        addToCart: (state,action) => {
            const existingProduct = state.basket.find((product) => product.id ===  action.payload.id);
            if(existingProduct){
                existingProduct.amount++;
                existingProduct.totalAmount++;
                existingProduct.totalPrice += existingProduct.price;
                state.totalAmount++;
                state.totalPrice += action.payload.price
            }else{
                state.basket.push(action.payload);
                state.totalAmount++;
                state.totalPrice += action.payload.price
            }
        },
        clearBasket: (state) => {
            state.basket = [];
            state.totalAmount = 0;
            state.totalPrice = 0;
        }

    }
})

export const {addToCart} = basketSlice.actions

export default basketSlice.reducer