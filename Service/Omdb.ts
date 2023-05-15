import Movie from '../Types/Movie';
import MovieDetails from '../Types/MovieDetails';
import MovieResponse from '../Types/MovieResponse';
import { apiKey } from '../config';

export async function getMovie(movieName: string) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}&page=2`);
    const jsonData: any = await response.json();
    const data: MovieResponse = {
        response: jsonData.Response,
        search: jsonData.Search,
        totalResults: jsonData.TotalResults,
    }
    if (data.search && data.search.length) {
        const movies: Movie[] = data.search.map((movieData: any) => {
            const movie: Movie = {
                title: movieData.Title,
                poster: movieData.Poster,
                year: movieData.Year,
                imdbID: movieData.imdbID,
                type: movieData.Type,
            };
            return movie;
        });
        return movies;
    }
    
    
};

export async function getMovieDetails(movieId: number) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}&plot=full`);
    const jsonData: any = await response.json();

    const movie: MovieDetails = {
        title: jsonData.Title,
        poster: jsonData.Poster,
        year: jsonData.Year,
        imdbID: jsonData.imdbID,
        type: jsonData.Type,
        actors: jsonData.Actors,
        plot: jsonData.Plot
    };
    return movie;
};


