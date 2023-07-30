import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import inputReducer from './inputSlice';
import cityReducer from './citySlice';
import { InputState, CityState } from "@/app/interfaces/redux";
import { createWrapper } from "next-redux-wrapper";

const store = configureStore({
  reducer: {
    input: inputReducer,
    city: cityReducer
  },
});

export interface RootState {
  city: CityState;
  input: InputState;
}

export type AppDispatch = typeof store.dispatch;
//export const useDispatch = () => useDispatch<AppDispatch>();

export default store;
