import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import inputReducer from './inputSlice';
import cityReducer from './citySlice';
import visitReducer from './visitSlice';
import dateRangeReducer from './dateRangeSlice';
import { InputState, CityState, VisitState, DateRangeState } from "@/app/interfaces/redux";
import { createWrapper } from "next-redux-wrapper";

const store = configureStore({
  reducer: {
    input: inputReducer,
    city: cityReducer,
    visit: visitReducer,
    dateRange: dateRangeReducer
  },
});

export interface RootState {
  city: CityState;
  input: InputState;
  visit: VisitState;
  dateRange: DateRangeState;
}

export type AppDispatch = typeof store.dispatch;
//export const useDispatch = () => useDispatch<AppDispatch>();

export default store;
