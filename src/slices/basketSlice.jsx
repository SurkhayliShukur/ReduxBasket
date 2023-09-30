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
        removeFromCart: (state,action) =>{
            const removedProduct = state.basket.find((product) => product.id === action.payload.id);
            if(removedProduct){
                state.basket = state.basket.filter((product) => product.id !== action.payload.id);
                state.amount -= removedProduct.amount;
                state.totalPrice-= removedProduct.totalPrice;
            }
        },
        clearBasket: (state) => {
            state.basket = [];
            state.totalAmount = 0;
            state.totalPrice = 0;
        },
        filterProduct: (state,action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredBasket = state.basket.filter((product) => {
                return(
                    product.title.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm)
                )
            })

        },
        increament: (state,action) => {
            const findIndex = state.basket.find((product) => product.id === action.payload.id);
            if(findIndex){
                state.amount++;
                findIndex.amount++;
                findIndex.totalPrice += findIndex.price;
                findIndex.totalAmount++;
                state.totalPrice += findIndex.price;
                state.totalAmount++;
            }
        },
        decrement: (state,action) => {
            const findIndex = state.basket.find((product) => product.id === action.payload.id);
            if (findIndex && findIndex.amount > 1) {
                findIndex.amount--;
                findIndex.totalPrice -= findIndex.price;
                findIndex.totalAmount--;
                state.totalAmount--;
                state.totalPrice -= findIndex.price;
              }
            
        },

        sortData: (state, action) => {
            state.filteredBasket = state.basket.sort((a, b) => {
              if (action.payload === "title" || action.payload === "category") {
                return a[action.payload].localeCompare(b[action.payload]);
              } else if (action.payload === "price" || action.payload === "rating") {
                return a[action.payload] - b[action.payload];
              }
            });
          },

    }
})

export const {addToCart,clearBasket,filterProduct,sortData,removeFromCart,increament,decrement} = basketSlice.actions

export default basketSlice.reducer