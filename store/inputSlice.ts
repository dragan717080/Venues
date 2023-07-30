import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InputState } from '@/app/interfaces/redux';

const initialState: InputState = {
  userInput: '',
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
  },
});

export const { setUserInput } = inputSlice.actions;

export default inputSlice.reducer;
