import {combineReducers} from "@reduxjs/toolkit";
import  basketSlice  from "../slices/basketSlice";
import  walletSlice  from "../slices/walletSlices";

const rootReducer = combineReducers({
    basket: basketSlice,
    wallet:walletSlice
})

export default rootReducer;