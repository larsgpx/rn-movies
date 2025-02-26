import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import type { FullMovie } from "../../entities/movie.entity";
import { MovieDBmovies } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";

export const getMovieByIdUseCase = async(fetcher: HttpAdapter, movieId:number): Promise<FullMovie> => {

    try {
        const movieById = await fetcher.get<MovieDBmovies>(`/${movieId}`);
        const fullMovie = MovieMapper.fromMovieDBToEntity(movieById);
        
        return fullMovie;
    } catch (error) {
        throw new Error(`Cannot get movie ID ${movieId}`);
    }
}