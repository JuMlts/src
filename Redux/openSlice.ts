import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface OpenState {
  isOpen: boolean;
}

const initialState: OpenState = {
  isOpen: false,
};

const openSlice = createSlice({
  name: 'open',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setOpen } = openSlice.actions;

export const selectOpen = (state: RootState): boolean => state.open.isOpen;

export default openSlice.reducer;
