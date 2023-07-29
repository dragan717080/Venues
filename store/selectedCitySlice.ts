import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface selectedCityState {
  selectedCity: string;
}

const initialState: selectedCityState = {
  selectedCity: '',
};

const selectedCitySlice = createSlice({
  name: 'selectedCity',
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
  },
});

export const { setSelectedCity } = selectedCitySlice.actions;

export default selectedCitySlice.reducer;
