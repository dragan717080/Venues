import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import inputReducer from './inputSlice';
import cityNamesReducer from './cityNamesSlice';
import selectedCityReducer from './selectedCitySlice';
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
        input: inputReducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);

const store = configureStore({
  reducer: {
    input: inputReducer,
    cityNames: cityNamesReducer,
    selectedCity: selectedCityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useDispatch<AppDispatch>();

export default store;
