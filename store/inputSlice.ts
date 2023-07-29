import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputState {
  userInput: string;
}

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
