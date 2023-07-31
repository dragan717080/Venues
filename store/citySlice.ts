import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityState } from '@/app/interfaces/redux';
import { BaseCity } from '@/app/interfaces/City';

const initialState: CityState = {
  selectedCity: '',
  cityNames: [],
  citiesMatchingInput: []
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
    setCityNames: (state, action: PayloadAction<BaseCity[]>) => {
      state.cityNames = action.payload;
    },
    setCitiesMatchingInput: (state, action: PayloadAction<BaseCity[]>) => {
      state.citiesMatchingInput = action.payload;
    },
  },
});

export const { setSelectedCity, setCityNames, setCitiesMatchingInput } = citySlice.actions;

export default citySlice.reducer;
