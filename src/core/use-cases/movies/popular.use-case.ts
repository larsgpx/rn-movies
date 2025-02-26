import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import type { Movie } from "../../entities/movie.entity";
import { PopularMoviesResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";

interface Options {
    page?: number;
    limit?: number;
}

export const moviesPopularUseCase = async (fetcher: HttpAdapter, options?: Options):Promise<Movie[]> => {

    try {
        const nowPlaying = await fetcher.get<PopularMoviesResponse>('/popular', {
            params: {
                page: options?.page ?? 1,
            }
        })

        // return nowPlaying.results.map(result => MovieMapper.fromMovieDBResult(result));
        return nowPlaying.results.map(MovieMapper.fromMovieDBResult);
    } catch (err) {
        console.log('Error Fetching movies - Popular: ' + err);
    }
}