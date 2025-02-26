import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';
import * as UseCases from '../../core/use-cases';
import { FullMovie } from '../../core/entities/movie.entity';
import { Cast } from '../../core/entities/cast.entity';

export const useMovie = (movieId:number) => {
  
    const [isLoading,setIsLoading] = useState(true);
    const [movieData, setMovieData] = useState<FullMovie>();
    const [cast, setCast] = useState<Cast[]>();

    useEffect(() => {
        loadMovie();
        setIsLoading(false);
    },
    [movieId]);

    const loadMovie = async () => {
        setIsLoading(true);
        const fullMoviePromise = UseCases.getMovieByIdUseCase(movieDBFetcher, movieId);
        const castPromise = UseCases.getMovieCastUseCase(movieDBFetcher, movieId);

        const [fullMovie, cast] = await Promise.all([fullMoviePromise, castPromise]);
        setIsLoading(false);
        setMovieData(fullMovie);
        setCast(cast);
        console.log('fullMovie', fullMovie);
    }

    if(isLoading) {
        return <Text>Loading...</Text>
    }

    return {
        movieData,
        isLoading,
        cast
    }
}