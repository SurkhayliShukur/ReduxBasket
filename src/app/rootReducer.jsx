import {combineReducers} from "@reduxjs/toolkit";
import  basketSlice  from "../slices/basketSlice";


const rootReducer = combineReducers({
    basket: basketSlice,
})

export default rootReducer;