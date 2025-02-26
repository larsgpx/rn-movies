import React, { useEffect, useState } from 'react'
import { Movie } from '../../core/entities/movie.entity';
import * as UseCases from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';
import { moviesUpcomingUseCase } from '../../core/use-cases/movies/upcoming.use-case';

let popularPage = 1;
export const useMovies = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);

    useEffect(() => {
        initialLoad();
    }, []);

    const initialLoad = async() => {
        
        try {
            const [nowPlayingMovies, topRatedMovies, popularMovies, upcomingUseCase] = await Promise.all([
                UseCases.moviesNowPlayingUseCase(movieDBFetcher),
                UseCases.moviesTopRatedUseCase(movieDBFetcher),
                UseCases.moviesPopularUseCase(movieDBFetcher),
                UseCases.moviesUpcomingUseCase(movieDBFetcher),
            ]);
    
            console.log(nowPlayingMovies[0], topRatedMovies[0], popularMovies[0], upcomingUseCase[0]);
            setNowPlaying(nowPlayingMovies);
            setTopRated(topRatedMovies);
            setPopular(popularMovies);
            setUpcoming(upcomingUseCase);

            setIsLoading(false);
        } catch (error) {
            console.error("Error loading movies data:", error);
        }
    }

    return {
    isLoading,
    nowPlaying,
    topRated,
    popular,
    upcoming,

    //metodos
    popularNextPage: async() => {
        popularPage++;
        try {
            const newPopularMovies = await UseCases.moviesPopularUseCase(movieDBFetcher, 
                { 
                    page: popularPage 
                });
            setPopular(prev => [...prev, ...newPopularMovies]);
        } catch (error) {
            console.error("Error loading popular movies data:", error);
        }
    }
    }
}