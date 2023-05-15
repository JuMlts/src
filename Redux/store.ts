import { combineReducers, configureStore, Reducer, CombinedState } from '@reduxjs/toolkit';
import moviesReducer, { MoviesState } from './moviesSlice';
import movieDetailsReducer, { MovieDetailsState } from './movieDetailsSlice';
import openReducer, { OpenState } from './openSlice';
import loaderReducer, { LoaderState } from './loaderSlice';
import ActiveMovieReducer, { ActiveMovieState } from './activeMovieSlice';

export interface RootState {
  activeMovie: ActiveMovieState;
  movies: MoviesState;
  movieDetails: MovieDetailsState;
  open: OpenState;
  loader: LoaderState;
}

const rootReducer: Reducer<CombinedState<RootState>> = combineReducers({
  activeMovie: ActiveMovieReducer,
  movies: moviesReducer,
  movieDetails: movieDetailsReducer,
  open: openReducer,
  loader: loaderReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
