import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import MovieDetails from '../Types/MovieDetails';

export interface ActiveMovieState {
    activeMovie: MovieDetails | undefined;
}

const initialState: ActiveMovieState = {
    activeMovie: undefined,
};

const activeMovieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setActiveMovie: (state, action: PayloadAction<MovieDetails>) => {
            state.activeMovie = action.payload;
        },
    },
});

export const { setActiveMovie } = activeMovieSlice.actions;
export const selectActiveMovie = (state: RootState): MovieDetails | undefined => state.activeMovie.activeMovie;

export default activeMovieSlice.reducer;
