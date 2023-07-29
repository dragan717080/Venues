import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface cityNamesState {
  cityNames: string[];
}

const initialState: cityNamesState = {
  cityNames: [],
};

const cityNamesSlice = createSlice({
  name: 'cityNames',
  initialState,
  reducers: {
    setCityNames: (state, action: PayloadAction<string>) => {
      state.cityNames = action.payload;
    },
  },
});

export const { setCityNames } = cityNamesSlice.actions;

export default cityNamesSlice.reducer;
