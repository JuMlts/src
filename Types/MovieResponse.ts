import { Movie } from './Movie';

export type MovieResponse = {
    response: boolean;
    search: Movie[];
    totalResults: string;
};

export default MovieResponse;