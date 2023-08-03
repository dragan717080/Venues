import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VisitState } from '@/app/interfaces/redux';

const initialState: VisitState = {
  daysDuration: 0,
  agency: 'Expedia',
  adults: 1,
  children: 0
};

const VisitSlice = createSlice({
  name: 'visit',
  initialState,
  reducers: {
    setDaysDuration: (state, action: PayloadAction<number>) => {
      state.daysDuration = action.payload;
    },
    setAgency: (state, action: PayloadAction<string>) => {
      state.agency = action.payload;
    },
    setAdults: (state, action: PayloadAction<number>) => {
      state.adults = action.payload;
    },
    setChildren: (state, action: PayloadAction<number>) => {
      state.children = action.payload;
    }
  },
});

export const { setDaysDuration, setAgency, setAdults, setChildren } = VisitSlice.actions;

export default VisitSlice.reducer;
