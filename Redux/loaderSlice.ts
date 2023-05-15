import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loaderSlice.actions;
export const selectLoading = (state: RootState): boolean => state.loader.isLoading;


export default loaderSlice.reducer;