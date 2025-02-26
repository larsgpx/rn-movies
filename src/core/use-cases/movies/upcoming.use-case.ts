import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import type { Movie } from "../../entities/movie.entity";
import { UpcomingMoviesResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";


export const moviesUpcomingUseCase = async (fetcher: HttpAdapter):Promise<Movie[]> => {

    try {
        const nowPlaying = await fetcher.get<UpcomingMoviesResponse>('/upcoming');

        // return nowPlaying.results.map(result => MovieMapper.fromMovieDBResult(result));
        return nowPlaying.results.map(MovieMapper.fromMovieDBResult);
    } catch (err) {
        console.log('Error Fetching movies - Upcoming: ' + err);
    }
}