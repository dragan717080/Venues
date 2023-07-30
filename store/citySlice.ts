import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityState } from '@/app/interfaces/redux';

const initialState: CityState = {
  selectedCity: '',
  cityNames: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
    setCityNames: (state, action: PayloadAction<string[]>) => {
      state.cityNames = action.payload;
    },
  },
});

export const { setSelectedCity, setCityNames } = citySlice.actions;

export default citySlice.reducer;
