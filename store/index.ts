import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import inputReducer from './inputSlice';
import cityReducer from './citySlice';
import visitReducer from './visitSlice';
import { InputState, CityState, VisitState } from "@/app/interfaces/redux";
import { createWrapper } from "next-redux-wrapper";

const store = configureStore({
  reducer: {
    input: inputReducer,
    city: cityReducer,
    visit: visitReducer
  },
});

export interface RootState {
  city: CityState;
  input: InputState;
  visit: VisitState;
}

export type AppDispatch = typeof store.dispatch;
//export const useDispatch = () => useDispatch<AppDispatch>();

export default store;
