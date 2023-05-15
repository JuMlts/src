import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieDetails } from "../Types/MovieDetails";
import { RootState } from './store';

export interface MovieDetailsState {
  movieDetails: MovieDetails | undefined;
}

const initialState: MovieDetailsState = {
  movieDetails: undefined,
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setMovieDetails: (state, action: PayloadAction<MovieDetails>) => {
      state.movieDetails = action.payload;
    },
  },
});

export const { setMovieDetails } = movieDetailsSlice.actions;

export const selectMovieDetails = (state: RootState): MovieDetails | undefined  => state.movieDetails.movieDetails;

export default movieDetailsSlice.reducer;
