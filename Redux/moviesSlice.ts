import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from "../Types/Movie";
import { RootState } from './store';

export interface MoviesState {
  movies: Movie[] | undefined;
}

const initialState: MoviesState = {
  movies: undefined,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies?.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      state.movies = state.movies?.filter((movie) => movie.imdbID !== action.payload);
    },
    resetMovies: (state) => {
      state.movies = initialState.movies;
    },
  },
});

export const { addMovie, removeMovie, setMovies, resetMovies } = moviesSlice.actions;
export const selectMovies = (state: RootState): Movie[] | undefined => state.movies.movies;

export default moviesSlice.reducer;