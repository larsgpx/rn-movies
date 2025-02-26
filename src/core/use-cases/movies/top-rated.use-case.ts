import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import type { Movie } from "../../entities/movie.entity";
import { TopRatedMoviesResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";


export const moviesTopRatedUseCase = async (fetcher: HttpAdapter):Promise<Movie[]> => {

    try {
        const nowPlaying = await fetcher.get<TopRatedMoviesResponse>('/top_rated');

        // return nowPlaying.results.map(result => MovieMapper.fromMovieDBResult(result));
        return nowPlaying.results.map(MovieMapper.fromMovieDBResult);
    } catch (err) {
        console.log('Error Fetching movies - Top rated: ' + err);
    }
}