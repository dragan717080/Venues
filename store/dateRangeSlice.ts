import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateRangeState } from '@/app/interfaces/redux';

const initialState: DateRangeState = {
  isDateRangeOpen: false,
};

const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState,
  reducers: {
    setIsDateRangeOpen: (state, action: PayloadAction<boolean>) => {
      state.isDateRangeOpen = action.payload;
    },
  },
});

export const { setIsDateRangeOpen } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
